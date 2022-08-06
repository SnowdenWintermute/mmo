import React, { useEffect, useRef } from "react";

interface Props {
  draw: (ctx: CanvasRenderingContext2D) => void;
  height: number;
  width: number;
  className: string;
}

const Canvas = (props: Props) => {
  const { draw, ...rest } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const render = () => {
        if (context) draw(context);
        animationFrameId = requestAnimationFrame(render);
      };
      render();
    }
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [draw]);

  return (
    <canvas ref={canvasRef} style={{ border: "1px solid white" }} {...rest} />
  );
};

export default Canvas;
