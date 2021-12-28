import { Sprite, Stage } from "@inlet/react-pixi";
import React, { useEffect, useRef, useState } from "react";
import { CharacterRadio } from "./character-radio";
import { SpineConfig } from "../config/spine-config";
import { SpineBoard } from "./SpineBoard";
import { SpwanManager } from "./spwanManager";

export const MainScreen = () => {
  const [character, setCharacter] = useState("None");
  const [charList, setCharList] = useState([
    "1012_skadi2",
    "003_kalts",
    "don't touch",
  ]);
  const [animationNames, setAnimationNames] = useState([]);
  const [animation, setAnimation] = useState("Idle");
  const [pixiApp, setPixiApp] = useState();

  // 생성된 캐릭터 목록
  const [spwanedCharList, setSpwanedCharList] = useState([]);
  const nextId = useRef(0);

  // Spine이 생성된 경우 목록에 추가
  const onCreated = (a) => {
    //console.log("------------");
    //console.log(a);
    setSpwanedCharList([...spwanedCharList, a]);
    nextId.current += 1;
  };

  // 삭제 시 목록에서 제거 및 렌더링도 삭제
  const onRemove = (spine) => {
    setSpwanedCharList(
      spwanedCharList.filter((spwanedChar) => spwanedChar.name !== spine.name)
    );
    // spine 제거
    const delId = spine.parent.getChildIndex(spine);
    spine.parent.removeChildAt(delId);
  };

  const getChar = (character) => {
    setCharacter(character);
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
            onCreated={onCreated}
            nextId={nextId}
          />
        </Stage>
      </div>
      <button onClick={onClickScreenshot}>Screenshot</button>
      <div>
        {spwanedCharList.length !== 0 ? (
          <SpwanManager spwanedCharList={spwanedCharList} onRemove={onRemove} />
        ) : (
          ""
        )}
      </div>

      <p>
        Arknights © is owned by Hypergryph, Yostar | All logos and trademarks
        are property of their respective owners.
      </p>
    </div>
  );
};
