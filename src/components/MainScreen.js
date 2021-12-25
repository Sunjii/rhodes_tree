import { Sprite, Stage } from "@inlet/react-pixi";
import React, { useState } from "react";
import { AnimationList } from "./animation-list";
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
  const [animation, setAnimation] = useState("Idle");

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

  const getAnimation = (ani) => {
    setAnimation(ani);
    //console.log(ani + " selected");
  };

  return (
    <div>
      <h1>Rhodes Tree</h1>
      <div>
        <CharacterRadio
          charList={charList}
          getChar={getChar}
          animationNames={animationNames}
          getAnimation={getAnimation}
        />
      </div>

      <div>
        <h4>SpineBoard</h4>
        <Stage options={SpineConfig.stage}>
          <SpineBoard
            character={character}
            getAniNames={getAniNames}
            animation={animation}
          />
        </Stage>
      </div>

      <p>
        Arknights © is owned by Hypergryph, Yostar | All logos and trademarks
        are property of their respective owners.
      </p>
    </div>
  );
};
