import { Point } from "@permadeath/game/dist/base/Point.js";
import { Entity } from "@permadeath/game/dist/entities/Entity.js";
import { Territory } from "./types/Territory";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
export default class Zone {
    id: number;
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
        [key: string]: {
            origin: Point;
            width: number;
            height: number;
            entities: {
                [key: string]: Entity | MobileEntity;
            };
        };
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
    constructor(id: number, origin: Point, width: number, height: number);
}
