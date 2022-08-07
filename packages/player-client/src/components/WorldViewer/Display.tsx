import React, { useEffect, useRef, useState } from "react";
import Canvas from "../Canvas/Canvas";
import { createNextFrameDrawFunction } from "./draw";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";

interface Props {
  mobileEntities: { [key: string]: MobileEntity };
}

const Display = (props: Props) => {
  const [drawFunctionExists, setDrawFunctionExists] = useState<Boolean>(false);
  const drawRef = useRef<(ctx: CanvasRenderingContext2D) => void>();
  const drawInterval = useRef<NodeJS.Timer>();

  useEffect(() => {
    drawInterval.current = setInterval(() => {
      const currDrawFunction = createNextFrameDrawFunction(
        props.mobileEntities
      );
      drawRef.current = currDrawFunction;
      // console.log(props.mobileEntities["1"].pos);
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
  return <p>preparing render...</p>;
};

export default Display;
