import React, { useState } from "react";
import { Spine } from "pixi-spine";
import * as PIXI from "pixi.js";

export const SpineBoard = () => {
  //app.stage.interactive = true;
  const pixiApp = new PIXI.Application({
    width: 712,
    height: 512,
  });
  pixiApp.stage.interactive = true;
  document.body.appendChild(pixiApp.view);
  pixiApp.stop();

  console.log("CALL");

  pixiApp.loader
    .add("skadi", "./charset/char_1012_skadi2.json")
    .load(function (loader, resources) {
      const animation = new Spine(resources.skadi.spineData);
      console.log("BABA");
      // set the position
      animation.x = pixiApp.screen.width / 2;
      animation.y = pixiApp.screen.height;
      animation.scale.set(0.7);

      pixiApp.stage.addChild(animation);

      if (animation.state.hasAnimation("Idle")) {
        animation.state.setAnimation(0, "Idle", true);
        animation.state.timeScale = 0.8;
      }

      pixiApp.start();
    });

  return <div>SpineBoard</div>;
};
