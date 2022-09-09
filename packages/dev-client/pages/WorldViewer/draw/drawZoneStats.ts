import { Zone } from "../../../../game";

export default function drawMatterBodyList(ctx: CanvasRenderingContext2D, zone: Zone) {
  const bodies = [];
  const edgeBodies = [];
  for (const entityId in zone.entities.agents) bodies.push(zone.entities.agents[entityId].body.id.toString().slice(-4));

  for (const zoneId in zone.entities.edge)
    for (const entityId in zone.entities.edge[zoneId])
      edgeBodies.push(zone.entities.edge[zoneId][entityId].body.id.toString().slice(-4));

  const fontSize = 18;
  const marginTop = 15;
  const marginLeft = 10;
  ctx.font = `${fontSize}px serif`;
  ctx.fillStyle = "white";
  const textLines = [
    { title: "Zone", text: zone.id.toString() },
    {
      title: "Agents",
      text: Object.keys(zone.entities.agents)
        .map((key) => key.slice(-4))
        .toString(),
    },
    { title: "Agent Bodies", text: bodies.toString() },
    { title: "Edge Bodies", text: edgeBodies.toString() },
  ];

  ctx.textAlign = "left";
  textLines.forEach((line, i) => {
    ctx.fillText(
      line.title + ": " + line.text,
      zone.territory.origin.x + marginLeft,
      zone.territory.origin.y + marginTop + i * (fontSize + marginTop)
    );
  });
}
