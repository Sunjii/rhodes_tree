import React from "react";
import { Spine } from "pixi-spine";
import * as PIXI from "pixi.js";

export const Main = () => {
  //app.stage.interactive = true;
  const app = new PIXI.Application({
    width: 712,
    height: 512,
  });
  //document.body.appendChild(app.view);

  app.loader
    .add("skadi", "./charset/char_1012_skadi2.json")
    .load(function (loader, resources) {
      try {
        const animation = new Spine(resources.skadi.spineData);

        // set the position
        animation.x = app.screen.width / 2;
        animation.y = app.screen.height;

        animation.scale.set(0.5);
        app.stage.addChild(animation);

        if (animation.state.hasAnimation("Idle")) {
          animation.state.setAnimation(0, "Idle", true);
          animation.state.timeScale = 0.3;
        }
      } catch (error) {
        console.log(error);
      }
    });

  return (
    <div>
      <h1>What</h1>
    </div>
  );
};
