import React, { useState, useRef, RefObject } from "react";
import { ListHeaderPropTypes } from "../../../../componentTypes.ts";
import "./listHeader.css";

function ListHeader({
  handleSubmit,
  saveInput,
  listTitle,
}: ListHeaderPropTypes) {
  const [titleEditMode, setTitleEditMode] = useState(false);
  const titleInputRef: RefObject<HTMLInputElement | null> = useRef(null);

  return (
    <>
      <div
        className="list-card-header" /*onBlur={() => setTitleEditMode(false)}*/
      >
        {titleEditMode ? (
          <>
            <input
              ref={titleInputRef}
              type="text"
              name="title"
              onKeyDown={e =>
                handleSubmit(e.currentTarget, e.code, setTitleEditMode)
              }
              autoFocus
              placeholder={listTitle}
            />
            <i
              className="fa-solid fa-check"
              onClick={() => {
                saveInput(titleInputRef?.current, setTitleEditMode);
              }}
            ></i>
          </>
        ) : (
          <>
            <h3 onDoubleClick={() => setTitleEditMode(true)}>{listTitle}</h3>
            <i
              className="fa-regular fa-pen-to-square"
              onClick={() => setTitleEditMode(true)}
            ></i>
          </>
        )}
      </div>
      <hr />
    </>
  );
}

export default ListHeader;
