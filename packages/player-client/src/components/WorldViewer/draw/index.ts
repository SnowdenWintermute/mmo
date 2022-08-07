import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";

export default function draw(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, 100, 100);
}

export function createNextFrameDrawFunction(mobileEntities: {
  [key: string]: MobileEntity;
}) {
  return (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    Object.keys(mobileEntities).forEach((key) => {
      ctx.fillStyle = "#FFF";
      ctx.fillRect(mobileEntities[key].pos.x, mobileEntities[key].pos.y, 1, 1);
    });
  };
}
