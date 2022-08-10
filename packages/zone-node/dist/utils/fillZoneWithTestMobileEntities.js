"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("@permadeath/game/dist/base/Point");
const MobileEntity_1 = require("@permadeath/game/dist/entities/MobileEntity");
const dist_1 = require("@permadeath/utils/dist");
const consts_1 = require("@permadeath/game/dist/consts");
function fillZoneWithTestMobileEntities(numberOfEntities, zone) {
    const { territory } = zone;
    const { origin } = territory;
    const bottomRightCorner = new Point_1.Point(origin.x + territory.width, origin.y + territory.height);
    for (let i = numberOfEntities; i > 0; i--)
        zone.entities.mobile[i - 1] = new MobileEntity_1.MobileEntity("entity " + (i - 1), new Point_1.Point((origin.x + bottomRightCorner.x) / 2, (origin.y + bottomRightCorner.y) / 2), (0, dist_1.randomInt)(1, 2), (pos, destination, speed) => {
            if (pos.x <= 0 ||
                pos.y <= 0 ||
                pos.x >= 1000 ||
                pos.y >= 1000 ||
                (pos.x === destination.x && pos.y === destination.y)) {
                destination.x = (0, dist_1.randomInt)(0, consts_1.worldWidth);
                destination.y = (0, dist_1.randomInt)(0, consts_1.worldHeight);
            }
            const elapsed = 33;
            const distance = Math.sqrt(Math.pow(destination.x - pos.x, 2) +
                Math.pow(destination.y - pos.y, 2));
            const directionX = (destination.x - pos.x) / distance;
            const directionY = (destination.y - pos.y) / distance;
            const newX = pos.x + directionX * speed;
            const newY = pos.y + directionY * speed;
            if (Math.sqrt(Math.pow(newX - pos.x, 2) + Math.pow(newY - pos.y, 2)) >=
                distance) {
                pos.x = destination.x;
                pos.y = destination.y;
            }
            else {
                pos.x = newX;
                pos.y = newY;
            }
        }, new Point_1.Point((0, dist_1.randomInt)(0, consts_1.worldWidth), (0, dist_1.randomInt)(0, consts_1.worldHeight)));
}
exports.default = fillZoneWithTestMobileEntities;
