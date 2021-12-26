import { Sprite, Stage } from "@inlet/react-pixi";
import React, { useEffect, useState } from "react";
import { AnimationList } from "./animation-list";
import { CharacterRadio } from "./character-radio";
import { SpineConfig } from "../config/spine-config";
import { animationNames, SpineBoard } from "./SpineBoard";

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

  const getChar = (character) => {
    // TODO: 중복 생성 이슈- getChar를 통해 캐릭터 선택을 입력받는다
    // 이를 Spine-board로 보내서 캐릭터를 load하게 되는데, useEffect 함수의 내이므로
    // 같은 캐릭터 선택 시에는 생성이 되지 않음..
    // 그런데 왜 delete 후에는 중복생성이 되는걸까?

    /*
    현재 까지 파악한 결과...
    A 생성 - B 생성 - 삭제(A) - A 생성(성공) - B 생성(성공) - 여기서는 삭제를 하지 않는 이상 더 생성되지 않음
    그러나 위에 다시 삭제를 하면...
    .. - 삭제(B) - B 생성(성공) - A 생성(성공)

    삭제를 하게 되면 A와 B 둘다 다시 생성할 수 있음.
    단 이전에 클릭한 애는 바로 만들지 못하고 다른 애가 만들어져야 만들어짐...

    // FIXME: 삭제 후 다시 loader.add 과정에서 중복 전송 하지 않도록
    // 추가적으로 확인한 사항
    // 삭제를 하면 loader에서 지워지므로
    // 다시 서버에서 json과 atlas를 받아오는 현상 발생.. png는 받아오진 않음

    */

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
