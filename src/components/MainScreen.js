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
  // 삭제 시 목록에서 제거하도록
  const onRemove = (id, spine) => {
    console.log(id);
    console.log(spine);
    // spwanedCharList에서 제거
    setSpwanedCharList(
      spwanedCharList.filter((spwanedChar) => spwanedChar.spineId !== id)
    );
    // 렌더링도 삭제
    // FIXME: 스파인 컨테이너는 자동적으로 정렬된다
    // 그러나 내가 정의한 spineId는 그러하지 않음.
    // 0 1 2 3 에서 2번을 삭제시키면...
    // 스파인 컨테이너는 0 1 2
    // spwCharList의 spineID는 0 1 3
    // 하지만 spwCharList의 인덱스는 0 1 2임!!!

    // spineID를 굳이 쓰지 말고...
    // 그냥 spwCharList의 인덱스를 쓰면 되지 않나??
    console.log(spine.parent);
    console.log(spwanedCharList);

    // id에 해당하는 인덱스를 찾는다

    spine.parent.removeChildAt(id);
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
            spwanedCharList={spwanedCharList}
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
