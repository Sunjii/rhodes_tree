import { Sprite, Stage } from "@inlet/react-pixi";
import React, { useEffect, useState } from "react";
import { AnimationList } from "./animation-list";
import { CharacterRadio } from "./character-radio";
import { SpineConfig } from "../config/spine-config";
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

  const [pixiApp, setPixiApp] = useState();

  const getChar = (character) => {
    // TODO: getChar를 통해 캐릭터 선택을 입력받는다
    // 이를 Spine-board로 보내서 캐릭터를 load하게 되는데, useEffect 함수의 내이므로
    // 같은 캐릭터 선택 시에는 생성이 되지 않음..
    // 혹은 delete 후 생성되는 걸 봐서는 삭제해야 바뀌나(?)
    setCharacter(character);
    // 정보를 spine-board에게로 넘기기

    console.log("getChar: " + character);
  };

  const getAniNames = (name) => {
    console.log("[MainScreen] : aniNames " + name);
    setAnimationNames(name);
  };

  console.log("Main Screen Rendered!");

  const getAnimation = (ani) => {
    setAnimation(ani);
  };

  // TODO: screen shot 기능 추가
  // 가능하다면..? gif 짤 쪄내기
  let wait = false;
  let waiting = false;
  const onClickScreenshot = () => {
    takeScreenshot();
  };

  const getPixiApp = (p) => {
    setPixiApp(p);
  };
  const getAnimationInitialize = (a) => {
    setAnimation(a);
  };

  function takeScreenshot() {
    wait = true;
    pixiApp.renderer.plugins.extract.canvas(pixiApp.stage).toBlob((b) => {
      const a = document.createElement("a");
      document.body.append(a);
      a.download = "screenshot";
      a.href = URL.createObjectURL(b);
      a.click();
      a.remove();
    }, "image/png");
  }

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
            getPixiApp={getPixiApp}
            getAnimationInitialize={getAnimationInitialize}
          />
        </Stage>
      </div>
      <button onClick={onClickScreenshot}>Screenshot</button>

      <p>
        Arknights © is owned by Hypergryph, Yostar | All logos and trademarks
        are property of their respective owners.
      </p>
    </div>
  );
};
