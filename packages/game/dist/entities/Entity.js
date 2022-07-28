"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Entity {
    // test: string;
    constructor(name, pos, speed) {
        this.move = (angle) => {
            const newX = this.pos.x + this.speed * Math.cos((angle * Math.PI) / 180);
            const newY = this.pos.y + this.speed * Math.sin((angle * Math.PI) / 180);
            this.pos.x = newX;
            this.pos.y = newY;
        };
        this.name = name;
        this.pos = pos;
        this.speed = speed;
        // this.test = "e";
    }
}
exports.Entity = Entity;
