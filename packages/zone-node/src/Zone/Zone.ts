import { Point } from "@permadeath/game/dist/base/Point.js";
import { Entity } from "@permadeath/game/dist/entities/Entity.js";
import { playerMaxViewDistance } from "@permadeath/game/dist/consts";
import { Territory } from "./types/Territory";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { Edge } from "./types/Edge";
import { CardinalOrdinalDirection } from "@permadeath/game/dist/enums/CardinalOrdinalDirection";
import { CardinalDirection } from "@permadeath/game/dist/enums/CardinalDirection";
import { OrdinalDirection } from "@permadeath/game/dist/enums/OrdinalDirection";
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
    arriving: MobileEntity[];
    static: { [name: string]: Entity };
    mobile: { [name: string]: MobileEntity };
  };
  players: Object;
  neighboringZones: { [key in CardinalOrdinalDirection]?: Territory };
  edgeThickness: number;
  edges: { [key in CardinalDirection]: Edge };
  corners: {
    [key in OrdinalDirection]: {
      width: number;
      height: number;
      origin: Point;
      entities: { [id: string]: Entity | MobileEntity };
    };
  };
  constructor(id: number, ip: string, origin: Point, width: number, height: number) {
    this.id = id;
    this.ip = ip;
    this.status = ZoneStatus.UNASSIGNED;
    this.territory = {
      origin: origin,
      width: width,
      height: height,
    };
    this.entities = {
      arriving: [],
      static: {},
      mobile: {},
    };
    this.players = {};
    this.neighboringZones = {};
    this.edgeThickness = playerMaxViewDistance;
    this.edges = {
      north: {
        origin: new Point(this.territory.origin.x, this.territory.origin.y),
        width: this.territory.width,
        height: this.edgeThickness,
        entities: {},
      },
      south: {
        origin: new Point(
          this.territory.origin.x,
          this.territory.origin.y + this.territory.height - this.edgeThickness
        ),
        width: this.territory.width,
        height: this.edgeThickness,
        entities: {},
      },
      east: {
        origin: new Point(this.territory.origin.x + this.territory.width - this.edgeThickness, this.territory.origin.y),
        width: this.edgeThickness,
        height: this.territory.height,
        entities: {},
      },
      west: {
        origin: new Point(this.territory.origin.x, this.territory.origin.y),
        width: this.edgeThickness,
        height: this.territory.height,
        entities: {},
      },
    };
    this.corners = {
      northEast: {
        width,
        height: this.edgeThickness,
        origin: new Point(this.territory.origin.x + this.territory.width - this.edgeThickness, this.territory.origin.y),
        entities: {},
      },
      northWest: {
        width,
        height: this.edgeThickness,
        origin: new Point(this.territory.origin.x, this.territory.origin.y),
        entities: {},
      },
      southEast: {
        width,
        height: this.edgeThickness,
        origin: new Point(
          this.territory.origin.x + this.territory.width,
          this.territory.origin.y + this.territory.height - this.edgeThickness
        ),
        entities: {},
      },
      southWest: {
        width,
        height: this.edgeThickness,
        origin: new Point(
          this.territory.origin.x,
          this.territory.origin.y + this.territory.height - this.edgeThickness
        ),
        entities: {},
      },
    };
  }
}
