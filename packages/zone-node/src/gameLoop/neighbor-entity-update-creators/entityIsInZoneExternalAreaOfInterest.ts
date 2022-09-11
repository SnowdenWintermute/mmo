import {
  BehavioralEntity,
  CardinalOrdinalDirection,
  DetailedRectangle,
  Entity,
  playerMaxViewDistance,
  Point,
  Rectangle,
  Zone,
} from "../../../../game";

export default function entityIsInZoneExternalAreaOfInterest(
  entity: BehavioralEntity | Entity,
  neighborZone: {
    territory: Rectangle;
    entities?: { [id: string]: BehavioralEntity };
  }
) {
  const { origin, width, height } = neighborZone.territory;
  const externalAreaOfInterest = new DetailedRectangle(
    new Point(origin.x - playerMaxViewDistance, origin.y - playerMaxViewDistance),
    width + playerMaxViewDistance * 2,
    height + playerMaxViewDistance * 2
  );
  return externalAreaOfInterest.containsPoint(entity.body.position);
}
