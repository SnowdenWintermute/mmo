import { Point } from "@permadeath/game/src/base/Point";
import { Entity } from "@permadeath/game/src/entities/Entity";
import { Territory } from "./types/Territory";
export declare class Zone {
    id: number;
    territory: Territory;
    entities: {
        [name: string]: Entity;
    };
    players: Object;
    borderingZoneEntities: Object;
    borderThickness: number;
    borders: Object;
    corners: Object;
    constructor(id: number, origin: Point, width: number, height: number);
}
