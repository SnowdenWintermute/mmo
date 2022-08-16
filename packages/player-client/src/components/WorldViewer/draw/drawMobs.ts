import Zone from "@permadeath/zone-node/dist/Zone/Zone";

export default function drawMobs(ctx: CanvasRenderingContext2D, zone: Zone) {
  if (zone.id === 0) ctx.fillStyle = "#4FA";
  else if (zone.id === 1) ctx.fillStyle = "#4AF";
  else if (zone.id === 2) ctx.fillStyle = "#FA4";
  else if (zone.id === 3) ctx.fillStyle = "#F4A";
  for (let i = 0; i < Object.keys(zone.entities.mobile).length; i++) {
    ctx.fillRect(
      zone.entities.mobile[i].pos.x,
      zone.entities.mobile[i].pos.y,
      2,
      2
    );
  }
}
