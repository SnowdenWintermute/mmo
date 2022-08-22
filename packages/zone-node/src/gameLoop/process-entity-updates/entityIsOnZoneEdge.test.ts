import entityIsOnZoneEdge from "./entityIsOnZoneEdge";
import Zone from "../../Zone/Zone";
import { Point } from "@permadeath/game";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";

test("entity is in inner territory", () => {
  const zone = new Zone(0, "192.168.1.1", new Point(0, 0), 500, 500);
  const entity = new MobileEntity("0", "entity-0", new Point(50, 50), 1, 0, new Point(300, 300));
  expect(entityIsOnZoneEdge(entity, zone)).toBeFalsy();
});

test("entity is on edge", () => {
  const zone = new Zone(0, "192.168.1.1", new Point(0, 0), 500, 500);
  const entityTopLeft = new MobileEntity("0", "entity-0", new Point(49, 49), 1, 0, new Point(300, 300));
  const entityBottomRight = new MobileEntity("0", "entity-0", new Point(451, 451), 1, 0, new Point(300, 300));
  expect(entityIsOnZoneEdge(entityTopLeft, zone)).toBeTruthy();
  expect(entityIsOnZoneEdge(entityBottomRight, zone)).toBeTruthy();
});
