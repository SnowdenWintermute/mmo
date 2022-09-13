import { Zone } from "../../../../game";
import { blue, green, orange, red } from "./colors";

export default function drawEdgeMobs(ctx: CanvasRenderingContext2D, zone: Zone) {
  for (const entityId in zone.entities.edge) {
    const currEntity = zone.entities.edge[entityId].entity;
    const { x, y } = currEntity.body.position;
    const { circleRadius } = currEntity.body;

    ctx.lineWidth = 10;
    ctx.beginPath();
    if (zone.id === 0) ctx.fillStyle = ctx.strokeStyle = green(0.5);
    else if (zone.id === 1) ctx.fillStyle = ctx.strokeStyle = blue(0.5);
    else if (zone.id === 2) ctx.fillStyle = ctx.strokeStyle = orange(0.5);
    else if (zone.id === 3) ctx.fillStyle = ctx.strokeStyle = red(0.5);
    ctx.arc(x, y, circleRadius || 5 - ctx.lineWidth, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
