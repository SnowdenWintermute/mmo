import BehavioralEntity from "@permadeath/game/dist/entities/BehavioralEntity";
import { DetailedRectangle } from "@permadeath/game/dist/base/Rectangles";
import Zone from "../../Zone/Zone";
import { CardinalOrdinalDirection } from "@permadeath/game/dist/enums/CardinalOrdinalDirection";

export default function determineZoneDepartingTo(entity: BehavioralEntity, zone: Zone) {
  const territory = zone.territory;
  const territoryRect = new DetailedRectangle(territory.origin, territory.width, territory.height);
  if (territoryRect.containsPoint(entity.body.position)) return null;
  const { neighboringZonesByDirection } = zone;
  let direction: keyof typeof CardinalOrdinalDirection;
  for (direction in neighboringZonesByDirection) {
    let zoneId: string;
    for (zoneId in neighboringZonesByDirection[direction]) {
      // @ts-ignore
      const neighborTerritory = neighboringZonesByDirection[direction][zoneId].territory;
      const neigborRect = new DetailedRectangle(
        neighborTerritory!.origin,
        neighborTerritory!.width,
        neighborTerritory!.height
      );
      if (neigborRect.containsPoint(entity.body.position)) return zoneId;
    }
  }
}
