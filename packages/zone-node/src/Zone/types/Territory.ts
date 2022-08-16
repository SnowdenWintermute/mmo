import { Point } from "@permadeath/game/dist/base/Point";

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
