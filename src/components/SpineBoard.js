import React, { useEffect, useState } from "react";
import { Spine, SpineSprite } from "pixi-spine";

import { useApp } from "@inlet/react-pixi";

export let animationNames;

export const SpineBoard = ({ character: characterName }) => {
  // access the PIXI.Application
  const pixiApp = useApp();

  // set filename
  const json_path = "./charset/char_1012_" + characterName + ".json";
  console.log(characterName, json_path);

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
      console.log(animationNames);

      // set the position and scale
      animation.x = pixiApp.screen.width / 2;
      animation.y = pixiApp.screen.height;
      animation.scale.set(0.7);

      // set animation
      if (animation.state.hasAnimation("Skill_2_Loop")) {
        animation.state.setAnimation(0, "Skill_2_Loop", true);
        animation.state.timeScale = 1.0;
      }

      pixiApp.stage.addChild(animation);
    });
  }, []);

  return <></>;

  /*
  //app.stage.interactive = true;
  const pixiApp = new PIXI.Application({
    width: 712,
    height: 512,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
  });
  document.body.appendChild(pixiApp.view);

  const container = new PIXI.Container();
  pixiApp.stage.addChild(container);

  console.log("CALL");
  pixiApp.stop();

  pixiApp.loader.add("skadi", "./charset/char_1012_skadi2.json");

  pixiApp.loader.load(function (loader, resources) {
    const animation = new Spine(resources.skadi.spineData);

    console.log("BABA");
    // set the position
    animation.x = pixiApp.screen.width / 2;
    animation.y = pixiApp.screen.height;
    animation.scale.set(0.7);

    if (animation.state.hasAnimation("Idle")) {
      animation.state.setAnimation(0, "Idle", true);
      animation.state.timeScale = 1.0;
    }

    container.addChild(animation);
    pixiApp.start();
  });

  pixiApp.start();
  */

  /*
  return (
    <div>
      <h4>SpineBoard</h4>
      <Stage>
        <Sprite image="./sample.png" />
      </Stage>
    </div>
  );
  */
};
