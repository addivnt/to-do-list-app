import React from "react";
import { ListContentPropTypes } from "../../../../componentTypes.ts";
import "./listContent.css";

function ListContent({
  item,
  handleCheck,
  handleDelete,
}: ListContentPropTypes) {
  return (
    <li key={item.id} className={`list-item ${item.checked ? "checked" : ""}`}>
      <span onClick={() => handleCheck(item.id)}>{item.name}</span>
      <i
        className="fa-solid fa-xmark"
        onClick={() => handleDelete(item.id)}
      ></i>
    </li>
  );
}

export default ListContent;
