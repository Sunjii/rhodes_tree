import React, { useState } from "react";

export const CharacterRadio = ({ charList, getChar }) => {
  const [selectedChar, setSelectedChar] = useState();
  const handleSelected = (e) => {
    // set
    setSelectedChar(e.target.value);
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
            <span>
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
              Submit
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
