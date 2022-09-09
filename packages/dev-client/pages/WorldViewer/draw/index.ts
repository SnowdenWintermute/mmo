import { Zone } from "../../../../game";
import drawEdgeMobs from "./drawEdgeMobs";
import drawExternalAreaOfInterest from "./drawExternalAreaOfInterest";
import drawZoneStats from "./drawZoneStats";
import drawMobs from "./drawMobs";
import drawTerritory from "./drawTerritory";

export function createNextFrameDrawFunction(zones: { [key: string]: Zone }) {
  return (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let zoneIndex = 0; zoneIndex < Object.keys(zones).length; zoneIndex++) {
      const zone = zones[zoneIndex];
      drawTerritory(ctx, zone);
      drawExternalAreaOfInterest(ctx, zone);
      drawMobs(ctx, zone);
      drawEdgeMobs(ctx, zone);
      drawZoneStats(ctx, zone);
    }
  };
}
