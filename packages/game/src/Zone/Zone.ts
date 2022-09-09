import { Point } from "../base/Point";
import { Entity } from "../entities/Entity";
import { playerMaxViewDistance } from "../consts";
import { Rectangle } from "../base/Rectangles";
import { CardinalOrdinalDirection } from "../enums/CardinalOrdinalDirection";
import { EntitiesByZoneId } from "./types/EntityCollections";
import { BehavioralEntity } from "../entities/BehavioralEntity";
export enum ZoneStatus {
  UNASSIGNED, // has no assigned territory
  NOMINAL, // operating within min/max cpu limits
  REQUESTING_SUPPORT, // operating beyond the upper cpu threshold
  SHRINKING, // handing off entities and territory to a bordering node
  GROWING, // accepting entities and territory from a bording node
}
export class Zone {
  id: number;
  timeOfLastUpdate: number;
  ip: string;
  status: ZoneStatus;
  territory: Rectangle;
  entities: {
    arriving: BehavioralEntity[];
    static: { [id: string]: Entity };
    agents: { [id: string]: BehavioralEntity };
    unappliedEdgeUpdate: EntitiesByZoneId;
    edge: EntitiesByZoneId;
    departing: EntitiesByZoneId;
    ofInterestToNeighbors: EntitiesByZoneId;
  };
  players: Object;
  neighboringZonesByDirection: {
    [key in CardinalOrdinalDirection]?: {
      [id: string]: { territory: Rectangle; entities?: { [id: string]: BehavioralEntity } };
    };
  };
  externalAreaOfInterest: Rectangle;
  constructor(id: number, ip: string, origin: Point, width: number, height: number) {
    this.id = id;
    this.timeOfLastUpdate = Date.now();
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
      departing: {},
      ofInterestToNeighbors: {},
    };
    this.players = {};
    this.neighboringZonesByDirection = {};
  }
}
