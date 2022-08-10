import Zone from "@permadeath/zone-node/dist/Zone/Zone";

export default function drawMobs(ctx: CanvasRenderingContext2D, zone: Zone) {
  ctx.fillStyle = zone.id === 0 ? "#4FA" : "#4AF";
  for (let i = 0; i < Object.keys(zone.entities.mobile).length; i++) {
    ctx.fillRect(
      zone.entities.mobile[i].pos.x,
      zone.entities.mobile[i].pos.y,
      2,
      2
    );
  }
}
