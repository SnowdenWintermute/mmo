import { DetailedRectangle, BehavioralEntity, Zone, CardinalOrdinalDirection } from "../../../../game";

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
