import Zone from "@permadeath/zone-node/dist/Zone/Zone";

export default function drawExternalAreaOfInterest(ctx: CanvasRenderingContext2D, zone: Zone) {
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  const { origin, width, height } = zone.externalAreaOfInterest;
  ctx.beginPath();
  ctx.strokeRect(origin.x, origin.y, width, height);
  // ctx.clearRect(zone.territory.origin.x, zone.territory.origin.y, zone.territory.width, zone.territory.height);
}
