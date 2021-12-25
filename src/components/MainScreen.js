import { Sprite, Stage } from "@inlet/react-pixi";
import React, { useState } from "react";
import { SpineConfig } from "./spine-config";
import { SpineBoard } from "./SpineBoard";

export const MainScreen = () => {
  const [character, setCharacter] = useState();

  return (
    <div>
      <h1>Rhodes Tree</h1>

      <div>
        <h4>SpineBoard</h4>
        <Stage options={SpineConfig.stage}>
          <SpineBoard character={"skadi2"} />
        </Stage>
      </div>
      <h1>Rhodes Botom</h1>
    </div>
  );
};
