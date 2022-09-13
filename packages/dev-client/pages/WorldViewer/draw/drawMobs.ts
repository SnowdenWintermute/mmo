import { Zone } from "../../../../game";
import { blue, green, orange, red } from "./colors";
import drawEntityText from "./drawEntityText";

export default function drawMobs(ctx: CanvasRenderingContext2D, zone: Zone) {
  if (zone.id === 0) ctx.fillStyle = green(1);
  else if (zone.id === 1) ctx.fillStyle = blue(1);
  else if (zone.id === 2) ctx.fillStyle = orange(1);
  else if (zone.id === 3) ctx.fillStyle = red(1);
  for (const entityId in zone.entities.agents) {
    const currEntity = zone.entities.agents[entityId];
    const { x, y } = currEntity.body?.position;
    const { circleRadius } = currEntity.body;
    ctx.beginPath();
    ctx.arc(x, y, circleRadius || 8, 0, 2 * Math.PI);
    ctx.fill();
    drawEntityText(ctx, currEntity);
  }
}
