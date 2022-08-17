import determineZoneNeighbors from "./determineZoneNeighbors";
import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import { Point } from "@permadeath/game/dist/base/Point";

test("four corners border", () => {
  const zones = {
    "0": new Zone(0, "192.168.1.1", new Point(10, 10), 10, 10), // self
    "1": new Zone(1, "192.168.1.2", new Point(20, 0), 10, 10), // northeast
    "2": new Zone(1, "192.168.1.3", new Point(0, 0), 10, 10), // northwest
    "3": new Zone(1, "192.168.1.4", new Point(20, 20), 10, 10), // southeast
    "4": new Zone(1, "192.168.1.5", new Point(0, 20), 10, 10), // southwest
  };
  expect(determineZoneNeighbors(zones)).toStrictEqual({
    "0": {
      northEast: { "1": { ip: "192.168.1.2" } },
      northWest: { "2": { ip: "192.168.1.3" } },
      southEast: { "3": { ip: "192.168.1.4" } },
      southWest: { "4": { ip: "192.168.1.5" } },
    },
    "1": {
      southWest: { "0": { ip: "192.168.1.1" } },
    },
    "2": {
      southEast: { "0": { ip: "192.168.1.1" } },
    },
    "3": {
      northWest: { "0": { ip: "192.168.1.1" } },
    },
    "4": {
      northEast: { "0": { ip: "192.168.1.1" } },
    },
  });
});

test("northwest corner border", () => {
  const zones = {
    "0": new Zone(0, "192.168.1.1", new Point(10, 10), 10, 10),
    "1": new Zone(1, "192.168.1.2", new Point(0, 0), 10, 10),
  };
  expect(determineZoneNeighbors(zones)).toStrictEqual({
    "0": {
      northWest: { "1": { ip: "192.168.1.2" } },
    },
    "1": {
      southEast: { "0": { ip: "192.168.1.1" } },
    },
  });
});

test("north border directly aligned", () => {
  const zones = {
    "0": new Zone(0, "192.168.1.1", new Point(10, 10), 10, 10),
    "1": new Zone(1, "192.168.1.2", new Point(10, 0), 10, 10),
  };
  expect(determineZoneNeighbors(zones)).toStrictEqual({
    "0": {
      north: { "1": { ip: "192.168.1.2" } },
    },
    "1": {
      south: { "0": { ip: "192.168.1.1" } },
    },
  });
});

test("north/south border offset left", () => {
  const zones = {
    "0": new Zone(0, "192.168.1.1", new Point(10, 10), 10, 10),
    "1": new Zone(1, "192.168.1.2", new Point(5, 0), 10, 10),
  };
  expect(determineZoneNeighbors(zones)).toStrictEqual({
    "0": {
      north: { "1": { ip: "192.168.1.2" } },
    },
    "1": {
      south: { "0": { ip: "192.168.1.1" } },
    },
  });
});

test("north/south border offset right", () => {
  const zones = {
    "0": new Zone(0, "192.168.1.1", new Point(10, 10), 10, 10),
    "1": new Zone(1, "192.168.1.2", new Point(15, 0), 10, 10),
  };
  expect(determineZoneNeighbors(zones)).toStrictEqual({
    "0": {
      north: { "1": { ip: "192.168.1.2" } },
    },
    "1": {
      south: { "0": { ip: "192.168.1.1" } },
    },
  });
});

test("east/west border offset up", () => {
  const zones = {
    "0": new Zone(0, "192.168.1.1", new Point(10, 10), 10, 10),
    "1": new Zone(1, "192.168.1.2", new Point(20, 5), 10, 10),
  };
  expect(determineZoneNeighbors(zones)).toStrictEqual({
    "0": {
      east: { "1": { ip: "192.168.1.2" } },
    },
    "1": {
      west: { "0": { ip: "192.168.1.1" } },
    },
  });
});
test("east/west border offset down", () => {
  const zones = {
    "0": new Zone(0, "192.168.1.1", new Point(10, 10), 10, 10),
    "1": new Zone(1, "192.168.1.2", new Point(20, 15), 10, 10),
  };
  expect(determineZoneNeighbors(zones)).toStrictEqual({
    "0": {
      east: { "1": { ip: "192.168.1.2" } },
    },
    "1": {
      west: { "0": { ip: "192.168.1.1" } },
    },
  });
});

test("zone above not bordering", () => {
  const zones = {
    "0": new Zone(0, "192.168.1.1", new Point(10, 10), 10, 10),
    "1": new Zone(1, "192.168.1.2", new Point(21, 0), 10, 10),
  };
  expect(determineZoneNeighbors(zones)).toStrictEqual({
    "0": {},
    "1": {},
  });
});
test("zone below not bordering", () => {
  const zones = {
    "0": new Zone(0, "192.168.1.1", new Point(10, 10), 10, 10),
    "1": new Zone(1, "192.168.1.2", new Point(21, 20), 10, 10),
  };
  expect(determineZoneNeighbors(zones)).toStrictEqual({
    "0": {},
    "1": {},
  });
});
test("zone right not bordering", () => {
  const zones = {
    "0": new Zone(0, "192.168.1.1", new Point(10, 10), 10, 10),
    "1": new Zone(1, "192.168.1.2", new Point(20, 21), 10, 10),
  };
  expect(determineZoneNeighbors(zones)).toStrictEqual({
    "0": {},
    "1": {},
  });
});
test("zone left not bordering", () => {
  const zones = {
    "0": new Zone(0, "192.168.1.1", new Point(10, 10), 10, 10),
    "1": new Zone(1, "192.168.1.2", new Point(0, 21), 10, 10),
  };
  expect(determineZoneNeighbors(zones)).toStrictEqual({
    "0": {},
    "1": {},
  });
});
