import React, { useEffect, useState } from "react";
import { Spine, SpineSprite } from "pixi-spine";
import * as PIXI from "pixi.js";
import { applyDefaultProps, Sprite, useApp } from "@inlet/react-pixi";

export let animationNames = [];
let loading = false;

export const SpineBoard = ({
  character,
  getAniNames,
  animation: selectedAnimation,
  getPixiApp,
  getAnimationInitialize,
  onCreated,
  nextId,
  lastChoice,
}) => {
  // access the PIXI.Application
  const pixiApp = useApp();
  getPixiApp(pixiApp);
  pixiApp.stage.interactive = true;

  if (!loading) {
    // background img
    const back = new PIXI.Container();
    const backgroundSprite = PIXI.Sprite.from("./charset/tree.png");
    back.addChild(backgroundSprite);
    pixiApp.stage.addChild(back);
    loading = true;
  }

  pixiApp.stage.hitArea = pixiApp.renderer.screen;
  pixiApp.stage.addListener("click", onClick);

  ///  // evnet fucntions
  // store the target
  let selectedTarget;
  // make semi-transparent add listen to drag-move events
  function onDragStart(e) {
    e.target.alpha = 0.5;
    selectedTarget = e.target;
    //console.log("[Spine-Board]onDragStart: " + selectedTarget);
    // Start listening to dragging on the stage
    pixiApp.stage.addListener("pointermove", onDragMove);
  }

  function onDragEnd() {
    selectedTarget.alpha = 1;
    //console.log("[Spine-Board]onDragEnd: " + selectedTarget);
    // stop listening
    pixiApp.stage.removeListener("pointermove", onDragMove);
  }

  function onDragMove(e) {
    //console.log("[Spine-Board]onDragMove: ");
    //console.log(selectedTarget);
    //console.log("[Spine-Board]onDragMove: ");
    //console.log(e);
    // 중앙
    e.data.global.x -= 0;
    e.data.global.y += 50;

    selectedTarget.parent.toLocal(e.data.global, null, selectedTarget.position);
  }

  function onClick(e) {
    if (selectedTarget) {
      //console.log("[Spine-Board]onClick: ");
      //console.log(selectedTarget);
      // 중앙
      e.data.global.x -= 0;
      e.data.global.y += 50;
      selectedTarget.position.copyFrom(e.data.global);
      // selectedTarget 초기화
      selectedTarget = null;
    }
  }

  // set filename
  //const json_path = "./charset/char_" + character + ".json";
  const json_path = "./charset/" + character + ".json";
  console.log(character, json_path, selectedAnimation);
  let randomnumber = Math.floor(Math.random() * 10) + 1;

  // load
  useEffect(() => {
    console.log("[Spine-Board] firstEffect : Start...");
    //

    try {
      pixiApp.loader.add(character, json_path);
    } catch (error) {
      console.log("[Spine-Board] firstEffect: ERR about loader.add");
    }

    pixiApp.loader.load((loader, resources) => {
      console.log("[Spine-Board] firstEffect : preload...");
      console.log(resources);
      console.log(character);
      console.log(resources[character]);
      const animation = new Spine(resources[character].spineData);
      console.log("[Spine-Board] firstEffect : In loader.add");

      // get animation list
      animationNames = animation.state.data.skeletonData.animations.map(
        (a) => a.name
      );
      animationNames.push("Back");
      //getAniNames(animationNames);

      // set spineId
      console.log("spineId is ", nextId.current);
      animation.spineId = nextId.current;

      // mouse and touch envets
      animation.interactive = true;
      animation.buttonMode = true;

      // set the position and scale
      animation.x = pixiApp.screen.width / randomnumber;
      animation.y = pixiApp.screen.height - 100;
      animation.scale.set(0.4);

      // set animation
      animation.state.setAnimation(0, "Default", true);
      animation.state.timeScale = 1.0;

      // add listner
      animation.addListener("pointerdown", onDragStart);
      animation.addListener("pointerup", onDragEnd);
      animation.addListener("pointerupoutside", onDragEnd);

      // set name and id
      animation.id = nextId.current;
      animation.name = character + "_" + nextId.current;
      // addChild
      pixiApp.stage.addChild(animation);

      console.log("[Spine-Board] FirstEffect : ");
      console.log(animation.name);
      console.log(pixiApp.stage);

      // MainScreen의 목록에 추가하기
      onCreated(animation);

      console.log(
        "[Spine-Board] : " +
          character +
          " with " +
          selectedAnimation +
          " Rendered!"
      );
    });

    console.log("[Spine-Board] firstEffect : out loader.add");
  }, [character]);

  // Change animation!!
  useEffect(() => {
    try {
      const animation = pixiApp.stage.getChildByName(lastChoice);
      //const animation = pixiApp.stage.getChildAt(0);

      //const animation = pixiApp.stage.getChildByName(character);
      console.log("[Spine-Board] SecondEffect : pixiApp.stage");
      console.log(pixiApp.stage);
      console.log("[Spine-Board] SecondEffect : animation");
      console.log(animation);

      // filp
      if (selectedAnimation === "Back") {
        animation.scale.x = animation.scale.x * -1;
        getAnimationInitialize("");
        return;
      }

      // set Animation
      try {
        animation.state.setAnimation(0, selectedAnimation, true);
        getAnimationInitialize("");
        console.log(
          "[Spine-Board] : SecondEffect " +
            character +
            " with " +
            selectedAnimation +
            " Rendered!"
        );
      } catch (error) {
        console.log(error);
      }
    } catch (error) {}

    //
    //
    //
  }, [selectedAnimation, lastChoice]);

  return <></>;
};
