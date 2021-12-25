import React, { useState } from "react";

export const AnimationList = ({ animationNames, getAni }) => {
  // change animation
  const changeAnimation = (e) => {
    //console.log("[AnimationList] : " + e.target.value);
    getAni(e.target.value);
  };

  return (
    <div>
      <h1>Animation List</h1>
      {animationNames.map((a) => (
        <span key={a}>
          <input
            key={a}
            type="radio"
            name="animationRadio"
            value={a}
            onClick={changeAnimation}
          />
          {a}
        </span>
      ))}
    </div>
  );
};
