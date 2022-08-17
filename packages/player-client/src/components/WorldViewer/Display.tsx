import React, { useEffect, useRef, useState } from "react";
import Canvas from "../Canvas/Canvas";
import { createNextFrameDrawFunction } from "./draw";
import Zone from "@permadeath/zone-node/dist/Zone/Zone";

interface Props {
  zones: { [key: string]: Zone };
  connectionStatus: string;
}

const Display = (props: Props) => {
  const [drawFunctionExists, setDrawFunctionExists] = useState<Boolean>(false);
  const drawRef = useRef<(ctx: CanvasRenderingContext2D) => void>();
  const drawInterval = useRef<NodeJS.Timer>();

  useEffect(() => {
    drawInterval.current = setInterval(() => {
      const currDrawFunction = createNextFrameDrawFunction(props.zones);
      drawRef.current = currDrawFunction;
      setDrawFunctionExists(Boolean(drawRef.current));
    }, 33);
    return () => clearInterval(drawInterval.current);
  }, [props.zones]);

  if (drawFunctionExists && drawRef.current)
    return (
      <div style={{ height: "0px" }}>
        <p
          style={{
            color: "white",
            position: "fixed",
            top: "10px",
            right: "20px",
          }}
        >
          world viewer
          <br />
          websocket status: {props.connectionStatus.toLowerCase()}
        </p>
        <Canvas draw={drawRef.current} frameRate={33} height={1000} width={1000} className={""} />
      </div>
    );
  else {
  }
  return <p>preparing render...</p>;
};

export default Display;
