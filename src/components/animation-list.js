import React, { useState } from "react";

export const AnimationList = ({ animationNames, getAni }) => {
  // change animation
  const changeAnimation = (e) => {
    getAni(e.target.value);
    console.log(e.target.value);
    e.preventDefault();
  };

  return (
    <div>
      <h2>Animation List</h2>
      {animationNames.map((a) => (
        <span key={a}>
          <button value={a} onClick={changeAnimation}>
            {a}
          </button>
        </span>
      ))}
    </div>
  );
};
