import { Entity } from "..";
import { Point } from "../base/Point";
export declare class MobileEntity extends Entity {
    move: Function;
    destination: Point;
    constructor(id: string, name: string, pos: Point, speed: number, move: Function, destination: Point);
}
