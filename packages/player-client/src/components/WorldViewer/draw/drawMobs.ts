import Zone from "@permadeath/zone-node/dist/Zone/Zone";

export default function drawMobs(ctx: CanvasRenderingContext2D, zone: Zone) {
  if (zone.id === 0) ctx.fillStyle = "#4FA";
  else if (zone.id === 1) ctx.fillStyle = "#4AF";
  else if (zone.id === 2) ctx.fillStyle = "#FA4";
  else if (zone.id === 3) ctx.fillStyle = "#F4A";
  for (const entityId in zone.entities.mobile) {
    ctx.fillRect(zone.entities.mobile[entityId].pos.x, zone.entities.mobile[entityId].pos.y, 3, 3);
  }
}
