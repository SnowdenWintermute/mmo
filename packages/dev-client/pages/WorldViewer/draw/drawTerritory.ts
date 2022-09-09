import { Zone } from "../../../../game";

export default function drawTerritory(ctx: CanvasRenderingContext2D, zone: Zone) {
  ctx.strokeStyle = "rgba(28, 182, 234, 0.62)";
  ctx.lineWidth = 1;
  const { origin, width, height } = zone.territory;
  ctx.beginPath();
  ctx.rect(origin.x, origin.y, width, height);
  ctx.stroke();
}
