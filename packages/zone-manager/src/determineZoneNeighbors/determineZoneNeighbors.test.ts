import determineZoneNeighbors from "./determineZoneNeighbors";
import { Point, Zone } from "../../../game";

test("8 surrounding zones bordering 1 and each other", () => {
  const zones = {
    "0": new Zone(0, "192.168.1.1", new Point(10, 10), 10, 10), // self
    "1": new Zone(1, "192.168.1.2", new Point(20, 0), 10, 10), // northeast
    "2": new Zone(1, "192.168.1.3", new Point(0, 0), 10, 10), // northwest
    "3": new Zone(1, "192.168.1.4", new Point(20, 20), 10, 10), // southeast
    "4": new Zone(1, "192.168.1.5", new Point(0, 20), 10, 10), // southwest
    "5": new Zone(1, "192.168.1.6", new Point(10, 0), 10, 10), // north
    "6": new Zone(1, "192.168.1.7", new Point(10, 20), 10, 10), // south
    "7": new Zone(1, "192.168.1.8", new Point(20, 10), 10, 10), // east
    "8": new Zone(1, "192.168.1.9", new Point(0, 10), 10, 10), // west
  };
  expect(determineZoneNeighbors(zones)).toStrictEqual({
    "0": {
      northEast: ["1"],
      northWest: ["2"],
      southEast: ["3"],
      southWest: ["4"],
      north: ["5"],
      south: ["6"],
      east: ["7"],
      west: ["8"],
    },
    "1": {
      southWest: ["0"],
      west: ["5"],
      south: ["7"],
    },
    "2": {
      southEast: ["0"],
      east: ["5"],
      south: ["8"],
    },
    "3": {
      northWest: ["0"],
      north: ["7"],
      west: ["6"],
    },
    "4": {
      northEast: ["0"],
      east: ["6"],
      north: ["8"],
    },
    "5": {
      south: ["0"],
      west: ["2"],
      east: ["1"],
      southEast: ["7"],
      southWest: ["8"],
    },
    "6": {
      north: ["0"],
      west: ["4"],
      east: ["3"],
      northEast: ["7"],
      northWest: ["8"],
    },
    "7": {
      west: ["0"],
      north: ["1"],
      south: ["3"],
      northWest: ["5"],
      southWest: ["6"],
    },
    "8": {
      east: ["0"],
      south: ["4"],
      north: ["2"],
      northEast: ["5"],
      southEast: ["6"],
    },
  });
});

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
      northEast: ["1"],
      northWest: ["2"],
      southEast: ["3"],
      southWest: ["4"],
    },
    "1": {
      southWest: ["0"],
    },
    "2": {
      southEast: ["0"],
    },
    "3": {
      northWest: ["0"],
    },
    "4": {
      northEast: ["0"],
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
      northWest: ["1"],
    },
    "1": {
      southEast: ["0"],
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
      north: ["1"],
    },
    "1": {
      south: ["0"],
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
      north: ["1"],
    },
    "1": {
      south: ["0"],
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
      north: ["1"],
    },
    "1": {
      south: ["0"],
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
      east: ["1"],
    },
    "1": {
      west: ["0"],
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
      east: ["1"],
    },
    "1": {
      west: ["0"],
    },
  });
});

test("two zones bordering to east", () => {
  const zones = {
    "0": new Zone(0, "192.168.1.1", new Point(10, 10), 10, 10),
    "1": new Zone(1, "192.168.1.2", new Point(20, 15), 10, 10),
    "2": new Zone(1, "192.168.1.3", new Point(20, 5), 10, 10),
  };
  expect(determineZoneNeighbors(zones)).toStrictEqual({
    "0": {
      east: ["1", "2"],
    },
    "1": {
      west: ["0"],
      north: ["2"],
    },
    "2": {
      west: ["0"],
      south: ["1"],
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
