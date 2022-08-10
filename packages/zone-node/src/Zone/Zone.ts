import { Point } from "@permadeath/game/dist/base/Point.js";
import { Entity } from "@permadeath/game/dist/entities/Entity.js";
import { playerMaxViewDistance } from "@permadeath/game/dist/consts";
import { Territory } from "./types/Territory";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
export default class Zone {
  id: number;
  territory: Territory;
  entities: {
    static: { [name: string]: Entity };
    mobile: { [name: string]: MobileEntity };
  };
  players: Object;
  borderingZoneEntities: Object;
  borderThickness: number;
  borders: {
    [key: string]: {
      origin: Point;
      width: number;
      height: number;
      entities: { [key: string]: Entity | MobileEntity };
    };
  };
  corners: {
    [key: string]: {
      width: number;
      height: number;
      origin: Point;
      entities: { [key: string]: Entity | MobileEntity };
    };
  };
  constructor(id: number, origin: Point, width: number, height: number) {
    this.id = id;
    this.territory = {
      origin: origin,
      width: width,
      height: height,
    };
    this.entities = {
      static: {},
      mobile: {},
    };
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
        origin: new Point(this.territory.origin.x, this.territory.origin.y),
        height: this.borderThickness,
        width: this.territory.width,
        entities: {},
      },
      south: {
        origin: new Point(
          this.territory.origin.x,
          this.territory.height - this.borderThickness
        ),
        height: this.borderThickness,
        width: this.territory.width,
        entities: {},
      },
      east: {
        origin: new Point(
          this.territory.origin.x + this.territory.width - this.borderThickness,
          this.territory.origin.y
        ),
        height: this.territory.height,
        width: this.borderThickness,
        entities: {},
      },
      west: {
        origin: new Point(this.territory.origin.x, this.territory.origin.y),
        height: this.territory.height,
        width: this.borderThickness,
        entities: {},
      },
    };
    this.corners = {
      northEast: {
        width,
        height: this.borderThickness,
        origin: new Point(
          this.territory.origin.x + this.territory.width - this.borderThickness,
          this.territory.origin.y
        ),
        entities: {},
      },
      northWest: {
        width,
        height: this.borderThickness,
        origin: new Point(this.territory.origin.x, this.territory.origin.y),
        entities: {},
      },
      southEast: {
        width,
        height: this.borderThickness,
        origin: new Point(
          this.territory.origin.x + this.territory.width,
          this.territory.origin.y + this.territory.height - this.borderThickness
        ),
        entities: {},
      },
      southWest: {
        width,
        height: this.borderThickness,
        origin: new Point(
          this.territory.origin.x,
          this.territory.origin.y + this.territory.height - this.borderThickness
        ),
        entities: {},
      },
    };
  }
}
