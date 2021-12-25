import React, { useEffect, useState } from "react";
import { Spine, SpineSprite } from "pixi-spine";

import { useApp } from "@inlet/react-pixi";

export let animationNames = [];

export const SpineBoard = ({
  character,
  getAniNames,
  animation: selectedAnimation,
}) => {
  // access the PIXI.Application
  const pixiApp = useApp();
  pixiApp.stage.interactive = true;

  // set filename
  const json_path = "./charset/char_" + character + ".json";
  console.log(character, json_path, selectedAnimation);

  let randomnumber = Math.floor(Math.random() * 10) + 1;

  // load
  useEffect(() => {
    pixiApp.loader.add(character, json_path).load((loader, resources) => {
      //console.log(resources[character].spineData);
      const animation = new Spine(resources[character].spineData);
      console.log("BABA");

      // get animation list
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

      // addChild
      animation.name = character;
      pixiApp.stage.addChild(animation);

      console.log("[Spine-Board] FirstEffect : ");
      console.log(animation.name);
      console.log(pixiApp.stage);

      // Press the screen to play a random animation
      //const allAnimations = ["Idle", "Start", "Die"];
      let lastAnimation = "";

      /*
      pixiApp.stage.on("pointerdown", () => {
        let anis = "";
        do {
          anis =
            animationNames[Math.floor(Math.random() * animationNames.length)];
        } while (anis === lastAnimation);
        animation.state.setAnimation(0, anis, true);
        lastAnimation = animation;
        console.log("Point: " + anis);
      });
      */
      // my on
      pixiApp.stage.on("myListner", () => {
        // animation list 선택에 따라 해당 애니메이션으로 변경하기
        let anis = selectedAnimation;

        animation.state.setAnimation(0, anis, true);
        console.log("[Spine-Board] stageOn: " + anis);
      });

      console.log(
        "[Spine-Board] : " +
          character +
          " with " +
          selectedAnimation +
          " Rendered!"
      );
    });
  }, [character]);

  // lets render
  useEffect(() => {
    const animation = pixiApp.stage.getChildByName(character);
    console.log("[Spine-Board] SecondEffect : pixiApp.stage");
    console.log(pixiApp.stage);
    console.log("[Spine-Board] SecondEffect : animation");
    console.log(animation);

    animation.state.setAnimation(0, selectedAnimation, true);

    console.log(
      "[Spine-Board] : SecondEffect " +
        character +
        " with " +
        selectedAnimation +
        " Rendered!"
    );
  }, [selectedAnimation]);

  //[character, selectedAnimation]

  // change animation
  /*
  useEffect(() => {
    console.log(
      "[Spine-Board] : " + selectedAnimation + " applied to " + character
    );
  }, [selectedAnimation]);
  */

  return <></>;
};
