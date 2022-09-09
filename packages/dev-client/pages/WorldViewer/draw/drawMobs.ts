import { Zone } from "../../../../game";
import { blue, green, orange, red } from "./colors";

export default function drawMobs(ctx: CanvasRenderingContext2D, zone: Zone) {
  if (zone.id === 0) ctx.fillStyle = green(1);
  else if (zone.id === 1) ctx.fillStyle = blue(1);
  else if (zone.id === 2) ctx.fillStyle = orange(1);
  else if (zone.id === 3) ctx.fillStyle = red(1);
  for (const entityId in zone.entities.agents) {
    const currEntity = zone.entities.agents[entityId];
    const { x, y } = currEntity.body?.position;
    const { circleRadius } = currEntity.body;
    const { destination } = currEntity;
    ctx.beginPath();
    ctx.arc(x, y, circleRadius || 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.textAlign = "center";
    const fontSize = 20;
    ctx.font = `${fontSize}px serif`;
    ctx.fillText(currEntity.currentAction || "null", x, y - ((circleRadius || 0) + 5));
    ctx.fillText(
      (destination?.x.toFixed(0).toString() || "") + ", " + destination?.y.toFixed(0).toString() || "null",
      x,
      y - ((circleRadius || 0) + fontSize + 5)
    );
    ctx.fillText(
      (x.toFixed(0).toString() || "") + ", " + y.toFixed(0).toString() || "null",
      x,
      y - ((circleRadius || 0) + fontSize * 2 + 5)
    );
  }
}
