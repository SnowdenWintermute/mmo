"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileEntity = void 0;
const __1 = require("..");
class MobileEntity extends __1.Entity {
    constructor(name, pos, speed, move, destination) {
        super(name, pos, speed);
        this.destination = destination;
        this.move = () => move(this.pos, this.destination, this.speed);
    }
}
exports.MobileEntity = MobileEntity;
