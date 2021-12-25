import React, { useEffect, useState } from "react";
import { Spine, SpineSprite } from "pixi-spine";

import { useApp } from "@inlet/react-pixi";

export let animationNames = [];

export const SpineBoard = ({
  character: characterName,
  getAniNames,
  animation: selectedAnimation,
}) => {
  // access the PIXI.Application
  const pixiApp = useApp();
  pixiApp.stage.interactive = true;

  // set filename
  const json_path = "./charset/char_" + characterName + ".json";
  console.log(characterName, json_path);

  let randomnumber = Math.floor(Math.random() * 10) + 1;

  // load
  useEffect(() => {
    pixiApp.loader.add(characterName, json_path).load((loader, resources) => {
      //console.log(resources[characterName].spineData);
      const animation = new Spine(resources[characterName].spineData);

      console.log("BABA");
      //console.log(animation.state.data.skeletonData.animations);
      animationNames = animation.state.data.skeletonData.animations.map(
        (a) => a.name
      );
      getAniNames(animationNames);
      //console.log(animationNames);

      // set the position and scale
      animation.x = pixiApp.screen.width / randomnumber;
      animation.y = pixiApp.screen.height;
      animation.scale.set(0.7);

      // set animation
      animation.state.setAnimation(0, selectedAnimation, true);
      animation.state.timeScale = 1.0;

      pixiApp.stage.addChild(animation);

      // Press the screen to play a random animation
      const allAnimations = ["Idle", "Start", "Die"];
      let lastAnimation = "";

      pixiApp.stage.on("pointerdown", () => {
        let anis = "";
        do {
          anis =
            allAnimations[Math.floor(Math.random() * allAnimations.length)];
        } while (anis === lastAnimation);
        animation.state.setAnimation(0, anis);
        lastAnimation = animation;
        console.log("Point: " + anis);
      });

      console.log(
        "[Spine-Board] : " +
          characterName +
          " with " +
          selectedAnimation +
          " Rendered!"
      );
    });
  }, [characterName, selectedAnimation]);

  // change animation
  /*
  useEffect(() => {
    console.log(
      "[Spine-Board] : " + selectedAnimation + " applied to " + characterName
    );
  }, [selectedAnimation]);
  */

  return <></>;
};
