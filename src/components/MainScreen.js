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

  //
  //
  //

  const [spwCharInputs, setSpwCharInputs] = useState({
    spineId: "",
    spine: "",
  });
  const { spineId, spine } = spwCharInputs;
  // 생성된 캐릭터 목록
  const [spwanedCharList, setSpwanedCharList] = useState([]);
  const nextId = useRef(0);
  // [ {id: 1, Spine:...}, {id:2,Spine:..}, .. ]

  // Spine이 생성된 경우 목록에 추가
  const onCreated = (a) => {
    console.log("------------");
    console.log(a);
    //const { charName, value } = c.name;
    //setSpwanedCharList([...spwanedCharList, a]);

    const spawnedChar = {
      spineId: nextId.current,
      spine: a,
    };
    setSpwanedCharList([...spwanedCharList, spawnedChar]);
    nextId.current += 1;

    //console.log(spwanedCharList);
  };

  // 삭제 시 목록에서 제거
  const onDelete = (id) => {
    // 현재는 0번이 삭제되므로 0번 항목 제거
    setSpwanedCharList(
      spwanedCharList.filter((spwanedChar) => spwanedChar.spineId !== id)
    );
  };

  //
  //
  //

  const getChar = (character) => {
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
            onCreated={onCreated}
            onDelete={onDelete}
          />
        </Stage>
      </div>
      <button onClick={onClickScreenshot}>Screenshot</button>
      <div>
        {spwanedCharList.length !== 0 ? (
          <SpwanManager spwanedCharList={spwanedCharList} />
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
