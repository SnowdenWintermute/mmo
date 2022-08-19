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
    containsPoint: (point: Point) => boolean;
    constructor(origin: Point, width: number, height: number);
}
