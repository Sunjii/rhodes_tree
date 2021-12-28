import React, { useEffect, useState } from "react";
import { AnimationList } from "./animation-list";
import { CharacterSizeBar } from "./character-size-bar";

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
    // animation 선택 초기화
    setSelectedChar(e.target.value);
  };

  const getAni = (ani) => {
    setAnimation(ani);
    getAnimation(ani); // 부모에게 전달
  };

  // btn click
  const onClick = (e) => {
    getChar(selectedChar);
    // selectedChar에 해당하는 animation 목록을 가져온다
    console.log(animationNames);
    setAnimationList(animationNames);

    // animation 선택 초기화
    setAnimation("Idle");
    //getAnimation("Idle");
    // character 선택 초기화
    try {
      for (let r in document.getElementsByName("CRadio")) {
        document.getElementsByName("CRadio")[r].checked = false;
      }
    } catch (error) {}
  };

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
                name="CRadio"
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
              Spwan
            </button>
          ) : (
            ""
          )}
          {selectedChar ? <p>{selectedChar} Spwan</p> : ""}
        </div>
        <div>{selectedChar ? <CharacterSizeBar /> : ""}</div>
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
