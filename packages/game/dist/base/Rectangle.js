"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
const Point_1 = require("./Point");
class Rectangle {
    constructor(origin, width, height) {
        this.origin = origin;
        this.topRightCorner = new Point_1.Point(origin.x + width - 1, origin.y);
        this.bottomRightCorner = new Point_1.Point(origin.x + width - 1, origin.y + height - 1);
        this.bottomLeftCorner = new Point_1.Point(origin.x, origin.y + height - 1);
        this.bottomY = origin.y + height - 1;
        this.leftX = origin.x;
        this.topY = origin.y;
        this.rightX = origin.x + width - 1;
    }
}
exports.Rectangle = Rectangle;
