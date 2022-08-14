import { Point } from "@permadeath/game/dist/base/Point";
// const { Point } = require("@permadeath/game");

export type Territory = {
  current: {
    origin: Point;
    width: number;
    height: number;
  };
  target: {
    origin: Point;
    width: number;
    height: number;
  };
};
