import { Point } from "@permadeath/game/dist/base/Point.js";
import { Entity } from "@permadeath/game/dist/entities/Entity.js";
import { playerMaxViewDistance } from "@permadeath/game/dist/consts";
import { Territory } from "./types/Territory";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { Border } from "./types/Border";
export enum ZoneStatus {
  UNASSIGNED, // has no assigned territory
  NOMINAL, // operating within min/max cpu limits
  REQUESTING_SUPPORT, // operating beyond the upper cpu threshold
  SHRINKING, // handing off entities and territory to a bordering node
  GROWING, // accepting entities and territory from a bording node
}
export default class Zone {
  id: number;
  ip: string;
  status: ZoneStatus;
  territory: Territory;
  entities: {
    static: { [name: string]: Entity };
    mobile: { [name: string]: MobileEntity };
  };
  players: Object;
  borderingZoneEntities: Object;
  borderThickness: number;
  borders: { [key: string]: Border };
  corners: {
    [key: string]: {
      width: number;
      height: number;
      origin: Point;
      entities: { [key: string]: Entity | MobileEntity };
    };
  };
  constructor(
    id: number,
    ip: string,
    origin: Point,
    width: number,
    height: number
  ) {
    this.id = id;
    this.ip = ip;
    this.status = ZoneStatus.UNASSIGNED;
    this.territory = {
      current: {
        origin: origin,
        width: width,
        height: height,
      },
      target: {
        origin: origin,
        width: width,
        height: height,
      },
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
        origin: new Point(
          this.territory.current.origin.x,
          this.territory.current.origin.y
        ),
        width: this.territory.current.width,
        height: this.borderThickness,
        borderingZoneIds: null,
        entities: {},
      },
      south: {
        origin: new Point(
          this.territory.current.origin.x,
          this.territory.current.origin.y +
            this.territory.current.height -
            this.borderThickness
        ),
        width: this.territory.current.width,
        height: this.borderThickness,
        borderingZoneIds: null,
        entities: {},
      },
      east: {
        origin: new Point(
          this.territory.current.origin.x +
            this.territory.current.width -
            this.borderThickness,
          this.territory.current.origin.y
        ),
        width: this.borderThickness,
        height: this.territory.current.height,
        borderingZoneIds: null,
        entities: {},
      },
      west: {
        origin: new Point(
          this.territory.current.origin.x,
          this.territory.current.origin.y
        ),
        width: this.borderThickness,
        height: this.territory.current.height,
        borderingZoneIds: null,
        entities: {},
      },
    };
    this.corners = {
      northEast: {
        width,
        height: this.borderThickness,
        origin: new Point(
          this.territory.current.origin.x +
            this.territory.current.width -
            this.borderThickness,
          this.territory.current.origin.y
        ),
        entities: {},
      },
      northWest: {
        width,
        height: this.borderThickness,
        origin: new Point(
          this.territory.current.origin.x,
          this.territory.current.origin.y
        ),
        entities: {},
      },
      southEast: {
        width,
        height: this.borderThickness,
        origin: new Point(
          this.territory.current.origin.x + this.territory.current.width,
          this.territory.current.origin.y +
            this.territory.current.height -
            this.borderThickness
        ),
        entities: {},
      },
      southWest: {
        width,
        height: this.borderThickness,
        origin: new Point(
          this.territory.current.origin.x,
          this.territory.current.origin.y +
            this.territory.current.height -
            this.borderThickness
        ),
        entities: {},
      },
    };
  }
}
