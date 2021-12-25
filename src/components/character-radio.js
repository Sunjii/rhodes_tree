import React, { useEffect, useState } from "react";
import { AnimationList } from "./animation-list";

export const CharacterRadio = ({
  charList,
  getChar,
  animationNames,
  getAnimation,
}) => {
  const [selectedChar, setSelectedChar] = useState();
  const [animation, setAnimation] = useState("Idle");
  const [animationList, setAnimationList] = useState([]);

  const handleSelected = (e) => {
    // set
    // animation 선택 초기화
    //setAnimation("Idle");
    //getAnimation("Idle");
    setSelectedChar(e.target.value);
  };

  const getAni = (ani) => {
    //console.log("[CharacterRadio] : ani = " + ani);
    setAnimation(ani);
    getAnimation(ani); // 부모에게 전달
  };

  //
  const getAnimationList = (selectedChar) => {};

  // btn click
  const onClick = (e) => {
    getChar(selectedChar);
    // selectedChar에 해당하는 animation 목록을 가져온다
    ////todo
    console.log(animationNames);
    setAnimationList(animationNames);

    // animation 선택 초기화
    setAnimation("Idle");
    getAnimation("Idle");
  };

  //
  useEffect(() => {
    console.log("FFFFFF");
  }, [animationNames]);

  return (
    <div>
      <h1>Select a Character</h1>
      <form>
        <div>
          {charList.map((value) => (
            <span key={value}>
              <input
                key={value}
                type="radio"
                name="Radio"
                value={value}
                onChange={handleSelected}
              />{" "}
              {value}
            </span>
          ))}
        </div>
        <div>
          {selectedChar ? (
            <button type="button" onClick={onClick}>
              Select
            </button>
          ) : (
            ""
          )}
          {selectedChar ? <p>You selected {selectedChar}</p> : ""}
        </div>
        <div>
          {animationNames.length !== 0 ? (
            <AnimationList animationNames={animationNames} getAni={getAni} />
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};
