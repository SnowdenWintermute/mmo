import { BehavioralEntity, Entity } from "../../../../game";

export default function drawEntityText(ctx: CanvasRenderingContext2D, entity: BehavioralEntity | Entity) {
  const { x, y } = entity.body?.position;
  const { circleRadius } = entity.body;

  const destination = entity instanceof BehavioralEntity ? entity.destination : null;
  ctx.textAlign = "center";
  const fontSize = 20;
  ctx.font = `${fontSize}px serif`;
  if (entity instanceof BehavioralEntity)
    ctx.fillText(entity.currentAction || "null", x, y - ((circleRadius || 0) + 5));
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
