import { Zone } from "../../../../game/src";
import { blue, green, orange, red } from "./colors";

export default function drawEdgeMobs(ctx: CanvasRenderingContext2D, zone: Zone) {
  for (const zoneFromId in zone.entities.edge) {
    for (const entityId in zone.entities.edge[zoneFromId]) {
      const currEntity = zone.entities.edge[zoneFromId][entityId];
      const { x, y } = currEntity.body.position;
      const { circleRadius } = currEntity.body;

      if (zone.id === 0) ctx.fillStyle = ctx.strokeStyle = green(1);
      else if (zone.id === 1) ctx.fillStyle = ctx.strokeStyle = blue(1);
      else if (zone.id === 2) ctx.fillStyle = ctx.strokeStyle = orange(1);
      else if (zone.id === 3) ctx.fillStyle = ctx.strokeStyle = red(1);
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(x, y, circleRadius || 5, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
}
