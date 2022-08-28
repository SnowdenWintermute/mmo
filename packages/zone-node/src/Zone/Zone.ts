import { Point } from "@permadeath/game/dist/base/Point.js";
import { Entity } from "@permadeath/game/dist/entities/Entity.js";
import { playerMaxViewDistance } from "@permadeath/game/dist/consts";
import { Rectangle } from "@permadeath/game/dist/base/Rectangles";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { CardinalOrdinalDirection } from "@permadeath/game/dist/enums/CardinalOrdinalDirection";
import { EntitiesByZoneId } from "./types/EntityCollections";
import BehavioralEntity from "@permadeath/game/dist/entities/BehavioralEntity";
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
  territory: Rectangle;
  entities: {
    arriving: MobileEntity[];
    static: { [id: string]: Entity };
    agents: { [id: string]: BehavioralEntity };
    unappliedEdgeUpdate: EntitiesByZoneId;
    edge: EntitiesByZoneId;
  };
  players: Object;
  neighboringZonesByDirection: {
    [key in CardinalOrdinalDirection]?: {
      [id: string]: { territory: Rectangle; entites?: { [id: string]: MobileEntity } };
    };
  };
  externalAreaOfInterest: Rectangle;
  constructor(id: number, ip: string, origin: Point, width: number, height: number) {
    this.id = id;
    this.ip = ip;
    this.status = ZoneStatus.UNASSIGNED;
    this.territory = new Rectangle(origin, width, height);
    this.externalAreaOfInterest = new Rectangle(
      new Point(origin.x - playerMaxViewDistance, origin.y - playerMaxViewDistance),
      width + playerMaxViewDistance * 2,
      height + playerMaxViewDistance * 2
    );
    this.entities = {
      arriving: [],
      static: {},
      agents: {},
      unappliedEdgeUpdate: {},
      edge: {},
    };
    this.players = {};
    this.neighboringZonesByDirection = {};
  }
}
