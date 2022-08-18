import Zone from "@permadeath/zone-node/dist/Zone/Zone";

export default function drawEdges(ctx: CanvasRenderingContext2D, zone: Zone) {
  ctx.strokeStyle = "rgba(245, 40, 145, 0.4)";
  for (const edge in zone.edges) {
    const { origin, width, height } = zone.edges[edge];
    ctx.beginPath();
    ctx.rect(origin.x, origin.y, width, height);
    ctx.stroke();
  }
}
