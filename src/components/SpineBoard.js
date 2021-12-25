import React, { useEffect, useState } from "react";
import { Spine, SpineSprite } from "pixi-spine";

import { useApp } from "@inlet/react-pixi";

export let animationNames = [];

export const SpineBoard = ({ character: characterName, getAniNames }) => {
  // access the PIXI.Application
  const pixiApp = useApp();

  // set filename
  const json_path = "./charset/char_" + characterName + ".json";
  console.log(characterName, json_path);

  let randomnumber = Math.floor(Math.random() * 10) + 1;
  console.log(randomnumber);

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
      //animation.x = pixiApp.screen.width / 2;
      animation.x = pixiApp.screen.width / randomnumber;
      animation.y = pixiApp.screen.height;
      animation.scale.set(0.7);

      // set animation
      if (animation.state.hasAnimation("Idle")) {
        animation.state.setAnimation(0, "Idle", true);
        animation.state.timeScale = 1.0;
      }

      pixiApp.stage.addChild(animation);
    });
  }, [characterName]);

  console.log("[Spine-Board] : " + characterName + " Rendered!");
  return <></>;
};
