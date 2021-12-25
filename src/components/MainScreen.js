import { Sprite, Stage } from "@inlet/react-pixi";
import React, { useState } from "react";
import { CharacterRadio } from "./character-radio";
import { SpineConfig } from "./spine-config";
import { animationNames, SpineBoard } from "./SpineBoard";

export const MainScreen = () => {
  const [character, setCharacter] = useState();
  const [charList, setCharList] = useState([
    "1012_skadi2",
    "003_kalts",
    "don't touch",
  ]);
  const [animationNames, setAnimationNames] = useState([]);

  const getChar = (character) => {
    setCharacter(character);
    console.log("getChar: " + character);
    // spineboard re-render
    // 스파인보드를 지우고(?)
  };

  const getAniNames = (name) => {
    setAnimationNames(name);
  };
  console.log("Main Screen Rendered!");
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
          <SpineBoard character={character} getAniNames={getAniNames} />
        </Stage>
      </div>
      <div>
        <h1>Animation List</h1>
        {animationNames.map((a) => (
          <spna>{a} </spna>
        ))}
      </div>
      <p>
        Arknights © is owned by Hypergryph, Yostar | All logos and trademarks
        are property of their respective owners.
      </p>
    </div>
  );
};
