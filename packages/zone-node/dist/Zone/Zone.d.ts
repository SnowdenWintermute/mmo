import { Point } from "@permadeath/game/dist/base/Point.js";
import { Entity } from "@permadeath/game/dist/entities/Entity.js";
import { Territory } from "./types/Territory";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { Border } from "./types/Border";
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
    borderingZoneEntities: Object;
    borderThickness: number;
    borders: {
        [key: string]: Border;
    };
    corners: {
        [key: string]: {
            width: number;
            height: number;
            origin: Point;
            entities: {
                [key: string]: Entity | MobileEntity;
            };
        };
    };
    constructor(id: number, ip: string, origin: Point, width: number, height: number);
}
