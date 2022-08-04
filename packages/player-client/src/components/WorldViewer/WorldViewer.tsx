import React, { useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Canvas from "../Canvas/Canvas";
import draw from "./draw";

const WorldViewer = () => {
  return (
    <div>
      <h1 style={{ color: "white" }}>world viewer</h1>
      <Canvas
        draw={draw}
        height={window.innerHeight}
        width={window.innerWidth}
        className={""}
      />
    </div>
  );
};

export default WorldViewer;
