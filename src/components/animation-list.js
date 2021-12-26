import React, { useState } from "react";

export const AnimationList = ({ animationNames, getAni }) => {
  // change animation
  const changeAnimation = (e) => {
    getAni(e.target.value);
  };

  return (
    <div>
      <h2>Animation List</h2>
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
