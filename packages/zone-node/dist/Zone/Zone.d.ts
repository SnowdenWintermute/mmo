import { Point } from "@permadeath/game/dist/base/Point.js";
import { Entity } from "@permadeath/game/dist/entities/Entity.js";
import { Rectangle } from "@permadeath/game/dist/base/Rectangles";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { CardinalOrdinalDirection } from "@permadeath/game/dist/enums/CardinalOrdinalDirection";
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
    territory: Rectangle;
    entities: {
        arriving: MobileEntity[];
        static: {
            [id: string]: Entity;
        };
        mobile: {
            [id: string]: MobileEntity;
        };
    };
    players: Object;
    neighboringZones: {
        [key in CardinalOrdinalDirection]?: {
            territory: Rectangle;
            entites?: {
                [id: string]: MobileEntity;
            };
        };
    };
    externalAreaOfInterest: Rectangle;
    constructor(id: number, ip: string, origin: Point, width: number, height: number);
}
