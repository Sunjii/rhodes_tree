import React, { useEffect, useState } from "react";
import { Spine, SpineSprite } from "pixi-spine";
import * as PIXI from "pixi.js";

import { applyDefaultProps, useApp } from "@inlet/react-pixi";

export let animationNames = [];

export const SpineBoard = ({
  character,
  getAniNames,
  animation: selectedAnimation,
}) => {
  // access the PIXI.Application
  const pixiApp = useApp();
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
    console.log("[Spine-Board]onDragStart: " + selectedTarget);
    // Start listening to dragging on the stage
    pixiApp.stage.addListener("pointermove", onDragMove);
  }

  function onDragEnd() {
    selectedTarget.alpha = 1;
    console.log("[Spine-Board]onDragEnd: " + selectedTarget);
    // stop listening
    pixiApp.stage.removeListener("pointermove", onDragMove);
  }

  function onDragMove(e) {
    // FIXME: Uncaught TypeError: Cannot read properties of undefined (reading 'x')
    console.log("[Spine-Board]onDragMove: ");
    console.log(selectedTarget);
    console.log("[Spine-Board]onDragMove: ");
    console.log(e);
    selectedTarget.parent.toLocal(e.data.global, null, selectedTarget.position);
  }

  function onClick(e) {
    console.log("[Spine-Board]onClick: " + selectedTarget);
    console.log(e);
    // FIXME: Uncaught TypeError: Cannot read properties of undefined (reading 'x')
    if (selectedTarget) {
      selectedTarget.position.copyFrom(e.data.global);
    }
  }

  // set filename
  const json_path = "./charset/char_" + character + ".json";
  console.log(character, json_path, selectedAnimation);

  let randomnumber = Math.floor(Math.random() * 10) + 1;

  // load
  useEffect(() => {
    try {
      pixiApp.loader.add(character, json_path).load((loader, resources) => {
        const animation = new Spine(resources[character].spineData);

        // get animation list
        animationNames = animation.state.data.skeletonData.animations.map(
          (a) => a.name
        );
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

        // FIXME: myListner 필요 없으면 삭제 예정...
        /*
        pixiApp.stage.on("myListner", () => {
          // animation list 선택에 따라 해당 애니메이션으로 변경하기
          let anis = selectedAnimation;
          animation.state.setAnimation(0, anis, true);
          console.log("[Spine-Board] stageOn: " + anis);
        });
        */

        console.log(
          "[Spine-Board] : " +
            character +
            " with " +
            selectedAnimation +
            " Rendered!"
        );
      });
    } catch (error) {}

    // change animation list
    try {
      const animation = pixiApp.stage.getChildByName(character);
      animationNames = animation.state.data.skeletonData.animations.map(
        (a) => a.name
      );
      getAniNames(animationNames);
    } catch (error) {
      console.log(error);
    }

    // TODO: add drag listner
    // 클릭하면 사각형의 'bound'를 표시해주고
    // 드래그 동안 이동 시킬 수 있게 함
    // 클릭을 떼는 순간 해당 위치에서 멈춤
    //
  }, [character]);

  // Change animation!!
  useEffect(() => {
    const animation = pixiApp.stage.getChildByName(character);
    console.log("[Spine-Board] SecondEffect : pixiApp.stage");
    console.log(pixiApp.stage);
    console.log("[Spine-Board] SecondEffect : animation");
    console.log(animation);

    // TODO: if animation is 'delete' delete the 'SPINE'

    // set Animation
    try {
      animation.state.setAnimation(0, selectedAnimation, true);
    } catch (error) {
      console.log(error);
    }

    console.log(
      "[Spine-Board] : SecondEffect " +
        character +
        " with " +
        selectedAnimation +
        " Rendered!"
    );
  }, [selectedAnimation]);

  return <></>;
};
