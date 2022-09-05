import { Zone } from "../../../../game";

export default function drawMobs(ctx: CanvasRenderingContext2D, zone: Zone) {
  if (zone.id === 0) ctx.fillStyle = "#4FA";
  else if (zone.id === 1) ctx.fillStyle = "#4AF";
  else if (zone.id === 2) ctx.fillStyle = "#FA4";
  else if (zone.id === 3) ctx.fillStyle = "#F4A";
  if (zone.id === 0) ctx.strokeStyle = "#4FA";
  else if (zone.id === 1) ctx.strokeStyle = "#4AF";
  else if (zone.id === 2) ctx.strokeStyle = "#FA4";
  else if (zone.id === 3) ctx.strokeStyle = "#F4A";
  for (const entityId in zone.entities.agents) {
    const { x, y } = zone.entities.agents[entityId].body.position;
    const { circleRadius } = zone.entities.agents[entityId].body;
    ctx.beginPath();
    ctx.arc(x, y, circleRadius || 1, 0, 2 * Math.PI);
    ctx.fill();
  }
  for (const zoneFromId in zone.entities.edge) {
    for (const entityId in zone.entities.edge[zoneFromId]) {
      console.log(zone.entities.edge[zoneFromId][entityId]);
      if (zone.entities.edge[zoneFromId][entityId]?.body?.position) {
        const { x, y } = zone.entities.edge[zoneFromId][entityId].body.position;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.stroke();
      } else {
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.arc(25, 25, 10, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  }
}
