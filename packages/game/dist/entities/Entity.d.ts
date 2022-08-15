import { Point } from "../base/Point";
export declare class Entity {
    id: string;
    name: string;
    pos: Point;
    speed: number;
    constructor(id: string, name: string, pos: Point, speed: number);
}
