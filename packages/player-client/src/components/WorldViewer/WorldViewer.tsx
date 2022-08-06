import React, { useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Canvas from "../Canvas/Canvas";
import draw, { createNextFrameDrawFunction } from "./draw";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { Point } from "@permadeath/game/dist/base/Point";
import { createRandomArrayMobileEntitiesInArea } from "@permadeath/utils/dist/index";

const WorldViewer = () => {
  const [drawFunctionExists, setDrawFunctionExists] = useState<Boolean>(false);
  const drawRef = useRef<(ctx: CanvasRenderingContext2D) => void>();
  const drawInterval = useRef<NodeJS.Timer>();
  const mobileEntitiesRef = useRef<MobileEntity[]>([]);
  useEffect(() => {
    const newEntities = createRandomArrayMobileEntitiesInArea(100, {
      topLeft: new Point(0, 0),
      botRight: new Point(1000, 1000),
    });
    mobileEntitiesRef.current = newEntities;
    console.log(mobileEntitiesRef.current);
  }, []);

  useEffect(() => {
    drawInterval.current = setInterval(() => {
      const currDrawFunction = createNextFrameDrawFunction(
        mobileEntitiesRef.current
      );
      drawRef.current = currDrawFunction;
      setDrawFunctionExists(Boolean(drawRef.current));
    }, 33);

    return () => clearInterval(drawInterval.current);
  }, []);

  if (drawFunctionExists && drawRef.current)
    return (
      <div style={{ height: "0px" }}>
        <h1 style={{ color: "white", position: "absolute", right: "20px" }}>
          world viewer
        </h1>
        <Canvas
          draw={drawRef.current}
          frameRate={33}
          height={window.innerHeight - 6}
          width={window.innerWidth - 2}
          className={""}
        />
      </div>
    );
  else {
  }
  return <p>"loading"</p>;
};

export default WorldViewer;
