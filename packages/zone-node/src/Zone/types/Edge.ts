import { Point } from "@permadeath/game/dist/base/Point";
import { Entity } from "@permadeath/game/dist/entities/Entity";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";

export type Edge = {
  origin: Point;
  width: number;
  height: number;
  entities: { [key: string]: Entity | MobileEntity };
};
