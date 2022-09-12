import { Zone } from "../../../../game";

export default function drawMatterBodyList(ctx: CanvasRenderingContext2D, zone: Zone) {
  const bodies = [];
  const edgeBodies = [];
  for (const entityId in zone.entities.agents) bodies.push(zone.entities.agents[entityId].body.id.toString());

  for (const zoneId in zone.entities.edge)
    for (const entityId in zone.entities.edge[zoneId]) {
      edgeBodies.push(zone.entities.edge[zoneId][entityId].body.id.toString());
    }

  zone.id === 2 && console.log(edgeBodies);
  const fontSize = 18;
  const initialMarginTop = 10;
  const marginTop = 15;
  const marginLeft = 10;
  ctx.font = `${fontSize}px serif`;
  ctx.fillStyle = "white";
  const textLines = [
    { title: "Zone", text: zone.id.toString(), extraMarginTop: 10 },
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
      zone.territory.origin.y + marginTop + initialMarginTop + i * (fontSize + marginTop)
    );
  });
}
