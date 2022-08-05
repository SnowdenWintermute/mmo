import React, { useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Canvas from "../Canvas/Canvas";
import draw, { createNextFrameDrawFunction } from "./draw";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { Point } from "@permadeath/game/dist/base/Point";
import { createRandomArrayMobileEntitiesInArea } from "@permadeath/utils/dist/index";

const WorldViewer = () => {
  const drawRef = useRef<(ctx: CanvasRenderingContext2D) => void>();
  const mobileEntitiesRef = useRef<MobileEntity[]>([]);
  useEffect(() => {
    const newEntities = createRandomArrayMobileEntitiesInArea(10, {
      topLeft: new Point(0, 0),
      botRight: new Point(100, 100),
    });
    mobileEntitiesRef.current.concat(newEntities);
  }, []);

  useEffect(() => {
    drawRef.current = createNextFrameDrawFunction(mobileEntitiesRef.current);
  }, []);
  if (!drawRef.current) return "loading";
  return (
    <div>
      <h1 style={{ color: "white" }}>world viewer</h1>
      <Canvas
        draw={drawRef.current}
        height={window.innerHeight}
        width={window.innerWidth}
        className={""}
      />
    </div>
  );
};

export default WorldViewer;
