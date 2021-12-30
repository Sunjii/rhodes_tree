import {
  PixiComponent,
  SimpleMesh,
  Sprite,
  Stage,
  useApp,
} from "@inlet/react-pixi";
import React, { useEffect, useRef, useState } from "react";
import { CharacterRadio } from "./character-radio";
import { SpineConfig } from "../config/spine-config";
import { SpineBoard } from "./SpineBoard";
import { SpwanManager } from "./spwanManager";
import * as PIXI from "pixi.js";
import { char_list } from "../config/char-list";

export const MainScreen = () => {
  const [character, setCharacter] = useState("None");

  const [characterList, setCharacterList] = useState({
    id: "",
    characterName: "",
  });

  // TODO:
  const { id, characterName } = characterList;

  const [charList, setCharList] = useState(char_list);
  const [animationNames, setAnimationNames] = useState([]);
  const [animation, setAnimation] = useState("Default");
  const [pixiApp, setPixiApp] = useState();

  // 생성된 캐릭터 목록
  const [spwanedCharList, setSpwanedCharList] = useState([]);
  const nextId = useRef(0);

  const [lastChoice, setLastChoice] = useState();

  // Spine이 생성된 경우 목록에 추가
  const onCreated = (a) => {
    //console.log("------------");
    //console.log(a);
    setSpwanedCharList([...spwanedCharList, a]);
    nextId.current += 1;
  };

  // spwlist 클릭한 요소 기준의 애니메이션 목록 로딩
  const onElementClick = (spine) => {
    const www = spine.state.data.skeletonData.animations.map((a) => a.name);
    www.push("Back");
    console.log("[MainScreen}: onElementclick");
    // 애니목록은 가져와짐
    getAniNames(www);
    const targetSpine = pixiApp.stage.getChildByName(spine.name);
    console.log(targetSpine);
    // tagetSpine을 lastChoice로 설정
    setLastChoice(targetSpine.name);
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

  // 선택한 애니메이션 이름을 가져옴
  const getAnimation = (ani) => {
    // state에 반영
    setAnimation(ani);
    // 해당 애니메이션으로 spine 변경하도록
  };

  // TODO: screen shot 기능 추가
  // 가능하다면..? gif 짤 쪄내기
  let wait = false;
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
        <Stage width={883} height={1211} options={SpineConfig.stage}>
          <SpineBoard
            character={character}
            getAniNames={getAniNames}
            animation={animation}
            getPixiApp={getPixiApp}
            getAnimationInitialize={getAnimationInitialize}
            onCreated={onCreated}
            nextId={nextId}
            lastChoice={lastChoice}
            onElementClick={onElementClick}
          />
        </Stage>
      </div>
      <button onClick={onClickScreenshot}>Screenshot</button>
      <div>
        {spwanedCharList.length !== 0 ? (
          <SpwanManager
            spwanedCharList={spwanedCharList}
            onRemove={onRemove}
            onElementClick={onElementClick}
          />
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
