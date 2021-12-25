import React, { useState } from "react";

export const CharacterRadio = ({ charList, getChar }) => {
  const [selectedChar, setSelectedChar] = useState();
  const handleSelected = (e) => {
    console.log(e.target.value);
    // set
    setSelectedChar(e.target.value);
  };

  return (
    <div>
      <h1>Select a Character</h1>
      <form>
        <div>
          {charList.map((value) => (
            <span>
              <input
                type="radio"
                name="Radio"
                value={value}
                onChange={handleSelected}
              />{" "}
              {value}
            </span>
          ))}
        </div>
      </form>
      <div>
        {selectedChar ? <button>Submit</button> : ""}
        {selectedChar ? <p>You selected {selectedChar}</p> : ""}
      </div>
    </div>
  );
};
