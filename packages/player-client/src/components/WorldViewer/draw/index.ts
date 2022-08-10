import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import drawBorders from "./drawBorders";
import drawMobs from "./drawMobs";
import drawTerritory from "./drawTerritory";

export function createNextFrameDrawFunction(zones: { [key: string]: Zone }) {
  return (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (
      let zoneIndex = 0;
      zoneIndex < Object.keys(zones).length;
      zoneIndex++
    ) {
      drawTerritory(ctx, zones[zoneIndex]);
      drawBorders(ctx, zones[zoneIndex]);
      drawMobs(ctx, zones[zoneIndex]);
    }
  };
}
