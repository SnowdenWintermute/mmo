import { Entity } from "..";
import { Point } from "../base/Point";
export declare class MobileEntity extends Entity {
    movementType: number;
    destination: Point;
    constructor(id: string, name: string, pos: Point, speed: number, movementType: number, destination: Point);
}
