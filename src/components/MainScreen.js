import { Sprite, Stage } from "@inlet/react-pixi";
import React, { useState } from "react";
import { CharacterRadio } from "./character-radio";
import { SpineConfig } from "./spine-config";
import { animationNames, SpineBoard } from "./SpineBoard";

export const MainScreen = () => {
  const [character, setCharacter] = useState();
  const [charList, setCharList] = useState([]);

  charList.push("skadi2", "kalt", "my");
  console.log(charList);

  const getChar = (character) => {
    setCharacter(character);
  };

  //<CharacterRadio charList={charList} getChar={getChar} />
  return (
    <div>
      <h1>Rhodes Tree</h1>
      <div>
        <CharacterRadio charList={charList} getChar={getChar} />
      </div>

      <div>
        <h4>SpineBoard</h4>
        <Stage options={SpineConfig.stage}>
          <SpineBoard character={"skadi2"} />
        </Stage>
      </div>
      <div>
        <h1>Animation List</h1>
        {animationNames}
      </div>
      <h1>Rhodes Botom</h1>
    </div>
  );
};
