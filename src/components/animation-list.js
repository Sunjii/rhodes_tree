import React, { useState } from "react";

export const AnimationList = ({ animationNames, getAni }) => {
  // change animation
  const changeAnimation = (e) => {
    //console.log(e.target.value);
    getAni(e.target.value);
  };

  return (
    <div>
      <h1>Animation List</h1>
      {animationNames.map((a) => (
        <spna>
          <input
            key={a}
            type="radio"
            name="animationRadio"
            value={a}
            onChange={changeAnimation}
          />
          {a}
        </spna>
      ))}
    </div>
  );
};
