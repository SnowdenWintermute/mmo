import { Point } from "@permadeath/game/src/base/Point";
import { Entity } from "@permadeath/game/src/entities/Entity";
import { playerMaxViewDistance } from "@permadeath/game/dist/consts";
export class Zone {
  id: number;
  origin: Point;
  width: number;
  height: number;
  entities: { [name: string]: Entity };
  players: Object;
  borderingZoneEntities: Object;
  borderThickness: number;
  borders: Object;
  corners: Object;
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
      northEast: {},
      northWest: {},
      southEast: {},
      southWest: {},
    };
    this.borderThickness = playerMaxViewDistance;
    this.borders = {
      north: {
        origin: new Point(this.origin.x, this.origin.y),
        height: this.borderThickness,
        width: this.width,
        entities: {},
      },
      south: {
        origin: new Point(this.origin.x, this.height - this.borderThickness),
        height: this.borderThickness,
        width: this.width,
        entities: {},
      },
      east: {
        origin: new Point(this.origin.x, this.origin.y),
        height: this.height,
        width: this.borderThickness,
        entities: {},
      },
      west: {
        origin: new Point(this.width - this.borderThickness, this.origin.y),
        height: this.height,
        width: this.borderThickness,
        entities: {},
      },
    };
    this.corners = {
      width,
      height: this.borderThickness,
      northEast: {
        origin: new Point(
          this.origin.x + this.width - this.borderThickness,
          this.origin.y
        ),
        entities: {},
      },
      northWest: {
        origin: new Point(this.origin.x, this.origin.y),
        entities: {},
      },
      southEast: {
        origin: new Point(
          this.origin.x + this.width,
          this.origin.y + this.height - this.borderThickness
        ),
        entities: {},
      },
      southWest: {
        origin: new Point(
          this.origin.x,
          this.origin.y + this.height - this.borderThickness
        ),
        entities: {},
      },
    };
  }
}
