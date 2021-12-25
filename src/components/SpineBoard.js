import React, { useEffect, useState } from "react";
import { Spine, SpineSprite } from "pixi-spine";
import * as PIXI from "pixi.js";
import {
  AnimatedSprite,
  Container,
  PixiComponent,
  Sprite,
  Stage,
  useApp,
} from "@inlet/react-pixi";

const [width, height] = [500, 500];
const spritesheet = "./charset/char_1012_skadi2.json";

export const SpineBoard = () => {
  const [frames, setFrames] = useState([]);
  const [rot, setRot] = useState(0);

  // access the PIXI.Application
  const pixiApp = useApp();
  const container = new PIXI.Container();

  // load
  useEffect(() => {
    /*
    pixiApp.loader.add(spritesheet).load((loader, resource) => {
      setFrames(
        Object.keys(resource[spritesheet].data.frames).map((frame) =>
          PIXI.Texture.from(frame)
        )
      );
    });
    */

    pixiApp.loader
      .add("skadi", "./charset/char_1012_skadi2.json")
      //.add(spritesheet)
      .load((loader, resources) => {
        //console.log(resources[spritesheet].data);

        /*
        setFrames(
          Object.keys(resources[spritesheet].data).map((frame) =>
            PIXI.Texture.from(frame)
          )
        );
        */

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

        //container.addChild(animation);
        pixiApp.stage.addChild(animation);
      });
  }, []);

  if (frames.length === 0) {
    return null;
  }

  return (
    <Container x={pixiApp.screen.width / 2} t={pixiApp.screen.height}>
      <AnimatedSprite
        animationSpeed={0.7}
        isPlaying={true}
        textures={frames}
        anchor={0.5}
      />
    </Container>
  );

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
