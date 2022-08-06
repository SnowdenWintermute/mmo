import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";

export default function draw(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, 100, 100);
}

export function createNextFrameDrawFunction(
  mobileEntities: Array<MobileEntity>
) {
  return (ctx: CanvasRenderingContext2D) => {
    console.log(mobileEntities);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    mobileEntities.forEach((entity) => {
      ctx.fillStyle = "#FFF";
      ctx.fillRect(entity.pos.x, entity.pos.y, 1, 1);
    });
  };
}
