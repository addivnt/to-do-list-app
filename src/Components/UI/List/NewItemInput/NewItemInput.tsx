import React, { useRef, RefObject, useState } from "react";
import "./newItemInput.css";
import { NewItemInputPropTypes } from "../../../../componentTypes.ts";

function NewItemInput({ handleSubmit, saveInput }: NewItemInputPropTypes) {
  const newItemInputRef: RefObject<HTMLInputElement | null> = useRef(null);
  const [newItemEditMode, setNewItemEditMode] = useState(false);

  return (
    <>
      {newItemEditMode && (
        <div className="list-card-new-item">
          <input
            ref={newItemInputRef}
            type="text"
            name="name"
            onKeyDown={e =>
              handleSubmit(e.currentTarget, e.code, setNewItemEditMode)
            }
            autoFocus
            placeholder="New item"
          />
          <button
            className="new-item-button"
            type="button"
            onClick={() => {
              saveInput(newItemInputRef?.current, setNewItemEditMode);
            }}
          >
            <i className="fa-solid fa-check"></i>
          </button>
        </div>
      )}
      <input
        className="add-item-button"
        type="button"
        value="+ add item"
        onClick={() => setNewItemEditMode(true)}
      />
    </>
  );
}

export default NewItemInput;
