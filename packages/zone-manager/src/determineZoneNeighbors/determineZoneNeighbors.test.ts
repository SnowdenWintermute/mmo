import determineZoneNeighbors from "./determineZoneNeighbors";
import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import { Point } from "@permadeath/game/dist/base/Point";

test("northeast border check working", () => {
  const zones = {
    "0": new Zone(0, "192.168.1.1", new Point(10, 10), 10, 10),
    "1": new Zone(1, "192.168.1.2", new Point(20, 0), 10, 10),
  };
  expect(determineZoneNeighbors(zones)).toStrictEqual({
    "0": {
      northEast: { "1": { ip: "192.168.1.2" } },
    },
    "1": {
      southWest: { "0": { ip: "192.168.1.1" } },
    },
  });
});
