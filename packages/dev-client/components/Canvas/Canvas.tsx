import React, { useEffect, useRef } from "react";

interface Props {
  draw: (ctx: CanvasRenderingContext2D) => void;
  frameRate: number;
  height: number;
  width: number;
  className: string;
}

const Canvas = (props: Props) => {
  const { draw, frameRate, ...rest } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number>();
  const renderIntervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    renderIntervalRef.current = setInterval(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (context) draw(context);
        animationFrameIdRef.current = requestAnimationFrame(() => {});
      }
    }, frameRate);
    return () => {
      clearInterval(renderIntervalRef.current);
      if (animationFrameIdRef.current) window.cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [draw]);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
