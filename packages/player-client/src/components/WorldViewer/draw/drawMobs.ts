import Zone from "@permadeath/zone-node/dist/Zone/Zone";

export default function drawMobs(ctx: CanvasRenderingContext2D, zone: Zone) {
  if (zone.id === 0) ctx.fillStyle = "#4FA";
  else if (zone.id === 1) ctx.fillStyle = "#4AF";
  else if (zone.id === 2) ctx.fillStyle = "#FA4";
  else if (zone.id === 3) ctx.fillStyle = "#F4A";
  if (zone.id === 0) ctx.strokeStyle = "#4FA";
  else if (zone.id === 1) ctx.strokeStyle = "#4AF";
  else if (zone.id === 2) ctx.strokeStyle = "#FA4";
  else if (zone.id === 3) ctx.strokeStyle = "#F4A";
  // for (const entityId in zone.entities.mobile) {
  //   const { x, y } = zone.entities.mobile[entityId].pos;
  //   ctx.beginPath();
  //   ctx.arc(x, y, 3, 0, 2 * Math.PI);
  //   ctx.fill();
  // }
  for (const zoneFromId in zone.entities.edge) {
    for (const entityId in zone.entities.edge[zoneFromId]) {
      const { x, y } = zone.entities.edge[zoneFromId][entityId].pos;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
}
