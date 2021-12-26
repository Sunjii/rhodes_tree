import React, { useEffect, useState } from "react";
import { Spine, SpineSprite } from "pixi-spine";
import * as PIXI from "pixi.js";
import { applyDefaultProps, Sprite, useApp } from "@inlet/react-pixi";

export let animationNames = [];

export const SpineBoard = ({
  character,
  getAniNames,
  animation: selectedAnimation,
  getPixiApp,
  getAnimationInitialize,
}) => {
  // access the PIXI.Application
  const pixiApp = useApp();
  getPixiApp(pixiApp);
  pixiApp.stage.interactive = true;

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
  const json_path = "./charset/char_" + character + ".json";
  console.log(character, json_path, selectedAnimation);
  let randomnumber = Math.floor(Math.random() * 10) + 1;

  // load
  useEffect(() => {
    console.log("[Spine-Board] firstEffect : Start...");
    //

    try {
      pixiApp.loader.add(character, json_path);
    } catch (error) {}

    pixiApp.loader.load((loader, resources) => {
      const animation = new Spine(resources[character].spineData);
      console.log("[Spine-Board] firstEffect : In loader.add");

      // get animation list
      animationNames = animation.state.data.skeletonData.animations.map(
        (a) => a.name
      );
      animationNames.push("Delete");
      getAniNames(animationNames);

      // mouse and touch envets
      animation.interactive = true;
      animation.buttonMode = true;

      // set the position and scale
      animation.x = pixiApp.screen.width / randomnumber;
      animation.y = pixiApp.screen.height;
      animation.scale.set(0.5);

      // set animation
      animation.state.setAnimation(0, selectedAnimation, true);
      animation.state.timeScale = 1.0;

      // add listner
      animation.addListener("pointerdown", onDragStart);
      animation.addListener("pointerup", onDragEnd);
      animation.addListener("pointerupoutside", onDragEnd);

      // addChild
      animation.name = character;
      pixiApp.stage.addChild(animation);

      console.log("[Spine-Board] FirstEffect : ");
      console.log(animation.name);
      console.log(pixiApp.stage);

      console.log(
        "[Spine-Board] : " +
          character +
          " with " +
          selectedAnimation +
          " Rendered!"
      );
    });

    // change animation list
    try {
      const animation = pixiApp.stage.getChildByName(character);
      animationNames = animation.state.data.skeletonData.animations.map(
        (a) => a.name
      );
      animationNames.push("Delete");
      getAniNames(animationNames);
    } catch (error) {
      console.log("[Spine-Board] firstEffect: fail to change animation list");
      console.log(error);
    }

    console.log("[Spine-Board] firstEffect : out loader.add");
  }, [character]);

  // Change animation!!
  useEffect(() => {
    const animation = pixiApp.stage.getChildByName(character);
    console.log("[Spine-Board] SecondEffect : pixiApp.stage");
    console.log(pixiApp.stage);
    console.log("[Spine-Board] SecondEffect : animation");
    console.log(animation);

    if (selectedAnimation === "Delete") {
      console.log("[Spine-Board] SecondEffect : Delete 선택");
      console.log(animation);

      // TODO: index 기반 삭제가 아닌, 이름으로 삭제하도록 해야함
      // 아니면 그냥 0번만 지우도록?
      // idea 1. 따로 목록을 만들어서 삭제할 수 있게 하자 like todo-list

      animation.parent.removeChildAt(0);

      // 삭제 후 delete 선택한 내역도 초기화 (delete 연달아 누를 수 있게)
      getAnimationInitialize("");

      console.log(animation);
      console.log(pixiApp.stage);
      return;
    } else {
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
    }
    //
    //
    //
  }, [selectedAnimation]);

  return <></>;
};
