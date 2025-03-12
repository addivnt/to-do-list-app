/// <reference lib="dom" />

import React, { Dispatch, SetStateAction } from "react";
import { ListType } from "../../../../api/dataTypes.ts";
import { ListPropTypes } from "../../../componentTypes.ts";
import { getHeaders } from "../utils/utils.ts";
import { useFilterSort } from "../utils/hooks.ts";
import ListItemHeader from "./ListHeader/ListHeader.tsx";
import NewItemInput from "./NewItemInput/NewItemInput.tsx";
import ListContent from "./ListContent/ListContent.tsx";
import "./List.css";

function List({ list, setData }: ListPropTypes) {
  const saveInput = (
    element: HTMLInputElement | null,
    setEditMode: Dispatch<SetStateAction<boolean>>
  ) => {
    if (element && element.value) {
      console.log("Saving...");
      try {
        fetch(`http://localhost:8000/lists/${list.id}`, {
          method: "PATCH",
          headers: getHeaders(),
          body:
            element.name === "title"
              ? JSON.stringify({ title: element.value })
              : element.name === "name"
              ? JSON.stringify({ content: [{ name: element.value }] })
              : null,
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Failed saving...");
            }
          })
          .then((json: ListType) => {
            useFilterSort(setData, list.id, json);
            console.log("Saved!");
          });
      } catch (error) {
        console.error((error as Error).message);
      }
      setEditMode(false);
    }
  };

  const handleDelete = (itemId?: number) => {
    console.log("Removing content...");
    if (!itemId && itemId !== 0) {
      try {
        fetch(`http://localhost:8000/lists/${list.id}`, {
          method: "DELETE",
        }).then(res => {
          if (res.ok) {
            setData(prev => prev.filter(elem => elem.id !== list.id));
            console.log("List removed!");
          } else {
            throw new Error("Failed deleting content");
          }
        });
      } catch (error) {
        console.error((error as Error).message);
      }
    } else if (itemId || itemId === 0) {
      const newContent = list.content.filter(elem => elem.id !== itemId);
      const removedContent = list.content.filter(elem => elem.id === itemId)[0];
      try {
        fetch(`http://localhost:8000/lists/${list.id}`, {
          method: "DELETE",
          headers: getHeaders(),
          body: JSON.stringify(removedContent),
        }).then(res => {
          if (res.ok) {
            useFilterSort(setData, list.id, { ...list, content: newContent });
            console.log("List item removed!");
          } else {
            throw new Error("Failed deleting content");
          }
        });
      } catch (error) {
        console.error((error as Error).message);
      }
    }
  };

  const handleCheck = (listItemID: number) => {
    const listContentElement = list.content.find(
      elem => elem.id === listItemID
    );

    if (listContentElement) {
      listContentElement.checked = !listContentElement.checked;
    }

    console.log("Checking item...");
    try {
      fetch(`http://localhost:8000/lists/${list.id}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ content: list.content }),
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Something went wrong");
          }
        })
        .then((json: ListType) => useFilterSort(setData, list.id, json));
      console.log("Successfully checked item!");
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const handleSubmit = (
    input: HTMLInputElement,
    keyboardCode: string,
    setEditMode: Dispatch<SetStateAction<boolean>>
  ) => {
    if (keyboardCode === "Enter") {
      saveInput(input, setEditMode);
    } else if (keyboardCode === "Escape") {
      setEditMode(false);
    }
  };

  const listContent = list.content.map(item => (
    <ListContent
      key={item.id}
      item={item}
      handleCheck={handleCheck}
      handleDelete={handleDelete}
    />
  ));

  return (
    <article key={list.id} className="list-card">
      <div className="delete-button" onClick={_e => handleDelete()}>
        <i className="fa-solid fa-xmark"></i>
      </div>
      <ListItemHeader
        handleSubmit={handleSubmit}
        saveInput={saveInput}
        listTitle={list.title}
      />
      <ul className="list-content">{listContent}</ul>
      <NewItemInput handleSubmit={handleSubmit} saveInput={saveInput} />
    </article>
  );
}

export default List;
