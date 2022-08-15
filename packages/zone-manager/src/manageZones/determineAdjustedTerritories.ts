import { Territory } from "@permadeath/zone-node/dist/Zone/types/Territory";
import Zone from "@permadeath/zone-node/dist/Zone/Zone";

export default function determineAdjustedTerritories(zones: {
  [key: string]: Zone;
}) {
  const adjustedTerritories = {};
  let zoneEntitiesXPositions: number[] = [];
  let zoneEntitiesYPositions: number[] = [];
  let entityType: keyof typeof zones[typeof zone]["entities"];
  for (entityType in zones[zone].entities) {
    for (const entity in zones[zone].entities[entityType]) {
      const currEntity = zones[zone].entities[entityType][entity];
      zoneEntitiesXPositions.push(currEntity.pos.x);
      zoneEntitiesYPositions.push(currEntity.pos.y);
    }
  }
}
