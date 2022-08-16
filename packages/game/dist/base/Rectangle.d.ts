import { Point } from "./Point";
export declare class Rectangle {
    origin: Point;
    topRightCorner: Point;
    bottomRightCorner: Point;
    bottomLeftCorner: Point;
    topY: number;
    bottomY: number;
    leftX: number;
    rightX: number;
    constructor(origin: Point, width: number, height: number);
}
