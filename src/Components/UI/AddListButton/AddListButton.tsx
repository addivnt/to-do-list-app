import React, { useContext } from "react";
import "./AddListButton.css";
import { AddListButtonPropTypes } from "../../../componentTypes.ts";
import { ThemeContext } from "../../../App.tsx";

function AddListButton({ setData }: AddListButtonPropTypes) {
  const [newListEditMode, setNewListEditMode] = React.useState<boolean | null>(
    null
  );
  const { theme } = useContext(ThemeContext);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const createNewList = (input: HTMLInputElement | null) => {
    const headers = new Headers();
    headers.set("content-type", "application/json");
    if (input && input.value.length > 0) {
      console.log("Creating new list...");
      try {
        fetch("http://localhost:8000/lists", {
          method: "POST",
          headers,
          body: JSON.stringify({ title: input.value }),
        })
          .then(res => res.json())
          .then(json => setData(prev => [...prev, json]));
        console.log("New list created!");
      } catch (error) {
        console.error((error as Error).message);
      }
    }
    setNewListEditMode(false);
  };

  const handleSubmit: React.KeyboardEventHandler<HTMLInputElement> = e => {
    const input = e.currentTarget as HTMLInputElement;

    if (e.code === "Enter") {
      input.value && createNewList(input);
    } else if (e.code === "Escape") {
      setNewListEditMode(false);
    }
  };

  return (
    <div className={`add-list-menu ${theme}`}>
      {!newListEditMode && (
        <div
          className="add-list-button card"
          onClick={() => setNewListEditMode(true)}
        >
          <button type="button">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      )}
      {newListEditMode ? (
        <>
          <div
            className="add-list-button card"
            onClick={() => createNewList(inputRef?.current)}
          >
            <button type="button">
              <i className="fa-solid fa-check"></i>
            </button>
          </div>
          <input
            ref={inputRef}
            onKeyDown={handleSubmit}
            id="new-list-title"
            type="text"
            autoFocus
            //   onBlur={() => setNewListEditMode(false)}
          />
        </>
      ) : (
        newListEditMode !== null && (
          <>
            <input id="new-list-title-out" inert type="text" />
          </>
        )
      )}
    </div>
  );
}

export default AddListButton;
