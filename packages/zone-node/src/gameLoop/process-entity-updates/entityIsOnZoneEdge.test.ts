import entityIsOnZoneEdge from "./entityIsOnZoneEdge";
import Zone from "@permadeath/game/dist/Zone/Zone";
import { Point } from "@permadeath/game";
import Matter from "matter-js";
import DestinationSeeker from "@permadeath/game/dist/entities/test-entities/DestinationSeeker";

test("entity is in inner territory", () => {
  const zone = new Zone(0, "192.168.1.1", new Point(0, 0), 500, 500);
  const entity = new DestinationSeeker("0", "entity-0", Matter.Bodies.circle(50, 50, 1), null);
  expect(entityIsOnZoneEdge(entity, zone)).toBeFalsy();
});

test("entity is on edge", () => {
  const zone = new Zone(0, "192.168.1.1", new Point(0, 0), 500, 500);
  const entityTopLeft = new DestinationSeeker("0", "entity-0", Matter.Bodies.circle(49, 49, 4), null);
  const entityBottomRight = new DestinationSeeker("0", "entity-0", Matter.Bodies.circle(451, 451, 4), null);
  expect(entityIsOnZoneEdge(entityTopLeft, zone)).toBeTruthy();
  expect(entityIsOnZoneEdge(entityBottomRight, zone)).toBeTruthy();
});
