import { Entity } from "..";
import { Point } from "../base/Point";
export declare class MobileEntity extends Entity {
    move: Function;
    constructor(name: string, pos: Point, speed: number, move: Function);
}
