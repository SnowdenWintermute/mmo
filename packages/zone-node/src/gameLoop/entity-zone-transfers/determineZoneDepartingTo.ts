import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { DetailedRectangle } from "@permadeath/game/dist/base/Rectangles";
import Zone from "../../Zone/Zone";
import { CardinalOrdinalDirection } from "@permadeath/game/dist/enums/CardinalOrdinalDirection";

export default function determineZoneDepartingTo(entity: MobileEntity, zone: Zone) {
  const territory = zone.territory;
  const territoryRect = new DetailedRectangle(territory.origin, territory.width, territory.height);
  if (territoryRect.containsPoint(entity.pos)) return null;
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
      if (neigborRect.containsPoint(entity.pos)) return zoneId;
    }
  }
}
