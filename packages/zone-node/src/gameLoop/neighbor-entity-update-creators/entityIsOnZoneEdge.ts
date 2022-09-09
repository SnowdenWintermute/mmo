import { playerMaxViewDistance, Point, DetailedRectangle, Entity, BehavioralEntity, Zone } from "../../../../game";

export default function entityIsOnZoneEdge(entity: BehavioralEntity | Entity, zone: Zone) {
  const { origin, width, height } = zone.territory;
  const innerTerritory = new DetailedRectangle(
    new Point(origin.x + playerMaxViewDistance, origin.y + playerMaxViewDistance),
    width - playerMaxViewDistance * 2,
    height - playerMaxViewDistance * 2
  );
  if (!innerTerritory.containsPoint(entity.body.position)) return true;
  else return false;
}
