import Zone from "@permadeath/zone-node/dist/Zone/Zone";

export default function drawTerritory(
  ctx: CanvasRenderingContext2D,
  zone: Zone
) {
  ctx.strokeStyle = "rgba(28, 182, 234, 0.62)";
  const { origin, width, height } = zone.territory.current;
  ctx.beginPath();
  ctx.rect(origin.x, origin.y, width, height);
  ctx.stroke();
}
