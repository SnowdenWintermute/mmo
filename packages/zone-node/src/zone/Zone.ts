import { Point } from "@permadeath/game/src/base/Point";
import { Entity } from "@permadeath/game/src/entities/Entity";
import { playerMaxVeiwDistance } from "@permadeath/game/dist/consts";
export class Zone {
  id: number;
  origin: Point;
  width: number;
  height: number;
  entities: { [name: string]: Entity };
  players: Object;
  borderingZoneEntities: Object;
  borders: Object;
  constructor(id: number, origin: Point, width: number, height: number) {
    this.id = id;
    this.origin = origin;
    this.width = width;
    this.height = height;
    this.entities = {};
    this.players = {};
    this.borderingZoneEntities = {
      north: {},
      south: {},
      east: {},
      west: {},
    };
    this.borders = {
      thickness: playerMaxVeiwDistance,
      north: {
        origin: new Point(this.origin.x, this.origin.y),
        height: playerMaxVeiwDistance,
        width: this.width,
        entities: {},
      },
      south: {
        origin: new Point(this.origin.x, this.height - playerMaxVeiwDistance),
        height: playerMaxVeiwDistance,
        width: this.width,
        entities: {},
      },
      east: {
        origin: new Point(this.origin.x, this.origin.y),
        height: this.height,
        width: playerMaxVeiwDistance,
        entities: {},
      },
      west: {
        origin: new Point(this.width - playerMaxVeiwDistance, this.origin.y),
        height: this.height,
        width: playerMaxVeiwDistance,
        entities: {},
      },
    };
  }
}
