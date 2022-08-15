"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const consts_1 = require("../../consts");
function repeatedlyMoveTowardRandomDestinations(pos, destination, speed) {
    if (pos.x <= 0 ||
        pos.y <= 0 ||
        pos.x >= 1000 ||
        pos.y >= 1000 ||
        (pos.x === destination.x && pos.y === destination.y)) {
        destination.x = (0, crypto_1.randomInt)(0, consts_1.worldWidth);
        destination.y = (0, crypto_1.randomInt)(0, consts_1.worldHeight);
    }
    const elapsed = 33;
    const distance = Math.sqrt(Math.pow(destination.x - pos.x, 2) + Math.pow(destination.y - pos.y, 2));
    const directionX = (destination.x - pos.x) / distance;
    const directionY = (destination.y - pos.y) / distance;
    const newX = pos.x + directionX * speed;
    const newY = pos.y + directionY * speed;
    if (Math.sqrt(Math.pow(newX - pos.x, 2) + Math.pow(newY - pos.y, 2)) >= distance) {
        pos.x = destination.x;
        pos.y = destination.y;
    }
    else {
        pos.x = newX;
        pos.y = newY;
    }
}
exports.default = repeatedlyMoveTowardRandomDestinations;
