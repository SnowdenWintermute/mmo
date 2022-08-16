import { Point } from "./Point";

export class Rectangle {
  origin: Point;
  topRightCorner: Point;
  bottomRightCorner: Point;
  bottomLeftCorner: Point;
  topY: number;
  bottomY: number;
  leftX: number;
  rightX: number;
  constructor(origin: Point, width: number, height: number) {
    this.origin = origin;
    this.topRightCorner = new Point(origin.x + width, origin.y);
    this.bottomRightCorner = new Point(origin.x + width, origin.y + height);
    this.bottomLeftCorner = new Point(origin.x, origin.y + height);
    this.bottomY = origin.y + height;
    this.leftX = origin.x;
    this.topY = origin.y;
    this.rightX = origin.x + width;
  }
}
