import { Point } from "@permadeath/game/dist/base/Point.js";
import { Entity } from "@permadeath/game/dist/entities/Entity.js";
import { Territory } from "./types/Territory";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { Edge } from "./types/Edge";
import { CardinalOrdinalDirection } from "@permadeath/game/dist/enums/CardinalOrdinalDirection";
import { CardinalDirection } from "@permadeath/game/dist/enums/CardinalDirection";
import { OrdinalDirection } from "@permadeath/game/dist/enums/OrdinalDirection";
export declare enum ZoneStatus {
    UNASSIGNED = 0,
    NOMINAL = 1,
    REQUESTING_SUPPORT = 2,
    SHRINKING = 3,
    GROWING = 4
}
export default class Zone {
    id: number;
    ip: string;
    status: ZoneStatus;
    territory: Territory;
    entities: {
        static: {
            [name: string]: Entity;
        };
        mobile: {
            [name: string]: MobileEntity;
        };
    };
    players: Object;
    neighboringZones: {
        [key in CardinalOrdinalDirection]?: Territory;
    };
    edgeThickness: number;
    edges: {
        [key in CardinalDirection]: Edge;
    };
    corners: {
        [key in OrdinalDirection]: {
            width: number;
            height: number;
            origin: Point;
            entities: {
                [id: string]: Entity | MobileEntity;
            };
        };
    };
    constructor(id: number, ip: string, origin: Point, width: number, height: number);
}
