import Zone from "@permadeath/zone-node/dist/Zone/Zone";

export default function drawBorders(ctx: CanvasRenderingContext2D, zone: Zone) {
  ctx.strokeStyle = "rgba(245, 40, 145, 0.4)";
  for (const border in zone.borders) {
    const { origin, width, height } = zone.borders[border];
    ctx.beginPath();
    ctx.rect(origin.x, origin.y, width, height);
    ctx.stroke();
  }
}
