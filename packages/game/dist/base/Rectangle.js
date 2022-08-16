"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
const Point_1 = require("./Point");
class Rectangle {
    constructor(origin, width, height) {
        this.origin = origin;
        this.topRightCorner = new Point_1.Point(origin.x + width, origin.y);
        this.bottomRightCorner = new Point_1.Point(origin.x + width, origin.y + height);
        this.bottomLeftCorner = new Point_1.Point(origin.x, origin.y + height);
        this.bottomY = origin.y + height;
        this.leftX = origin.x;
        this.topY = origin.y;
        this.rightX = origin.x + width;
    }
}
exports.Rectangle = Rectangle;
