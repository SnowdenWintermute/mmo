import { Point, Zone, BehavioralEntity } from "../../../../game";
import entityIsOnZoneEdge from "./entityIsOnZoneEdge";
import Matter from "matter-js";
import { BehaviorTypes } from "../../../../game/src/behavior-trees/BehaviorTypes";

test("entity is in inner territory", () => {
  const zone = new Zone(0, "192.168.1.1", new Point(0, 0), 500, 500);
  const entity = new BehavioralEntity(
    "0",
    "entity-0",
    Matter.Bodies.circle(50, 50, 1),
    BehaviorTypes.MOVES_TOWARD_RANDOM_DESTINATIONS
  );
  expect(entityIsOnZoneEdge(entity, zone)).toBeFalsy();
});

test("entity is on edge", () => {
  const zone = new Zone(0, "192.168.1.1", new Point(0, 0), 500, 500);
  const entityTopLeft = new BehavioralEntity(
    "0",
    "entity-0",
    Matter.Bodies.circle(49, 49, 4),
    BehaviorTypes.MOVES_TOWARD_RANDOM_DESTINATIONS
  );
  const entityBottomRight = new BehavioralEntity(
    "0",
    "entity-0",
    Matter.Bodies.circle(451, 451, 4),
    BehaviorTypes.MOVES_TOWARD_RANDOM_DESTINATIONS
  );
  expect(entityIsOnZoneEdge(entityTopLeft, zone)).toBeTruthy();
  expect(entityIsOnZoneEdge(entityBottomRight, zone)).toBeTruthy();
});
