import React, { useState } from "react";

export const CharacterRadio = ({ charList, getChar }) => {
  const [selectedChar, setSelectedChar] = useState();
  const handleSelected = (e) => {
    // set
    setSelectedChar(e.target.value);
    // animation 선택 초기화
  };

  // btn click
  const onClick = (e) => {
    getChar(selectedChar);
  };

  return (
    <div>
      <h1>Select a Character</h1>
      <form>
        <div>
          {charList.map((value) => (
            <span key={value}>
              <input
                key={value}
                type="radio"
                name="Radio"
                value={value}
                onChange={handleSelected}
              />{" "}
              {value}
            </span>
          ))}
        </div>
        <div>
          {selectedChar ? (
            <button type="button" onClick={onClick}>
              Select
            </button>
          ) : (
            ""
          )}
          {selectedChar ? <p>You selected {selectedChar}</p> : ""}
        </div>
      </form>
    </div>
  );
};
