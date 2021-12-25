import { Sprite, Stage } from "@inlet/react-pixi";
import React from "react";
import { SpineConfig } from "./spine-config";
import { SpineBoard } from "./SpineBoard";

export const MainScreen = () => {
  return (
    <div>
      <h1>Rhodes Tree</h1>

      <div>
        <h4>SpineBoard</h4>
        <Stage options={SpineConfig.stage}>
          <SpineBoard />
        </Stage>
      </div>
      <h1>Rhodes Botom</h1>
    </div>
  );
};
