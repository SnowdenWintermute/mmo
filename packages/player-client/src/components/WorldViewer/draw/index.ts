import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import drawEdges from "./drawEdges";
import drawMobs from "./drawMobs";
import drawTerritory from "./drawTerritory";

export function createNextFrameDrawFunction(zones: { [key: string]: Zone }) {
  return (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let zoneIndex = 0; zoneIndex < Object.keys(zones).length; zoneIndex++) {
      const zone = zones[zoneIndex];
      drawTerritory(ctx, zone);
      drawEdges(ctx, zone);
      drawMobs(ctx, zone);
      ctx.font = "12px serif";
      ctx.fillText(zone.id.toString(), zone.territory.origin.x + 10, zone.territory.origin.y + 20);
    }
  };
}
