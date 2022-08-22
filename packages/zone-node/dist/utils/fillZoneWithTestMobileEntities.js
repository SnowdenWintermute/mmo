"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("@permadeath/game/dist/base/Point");
const MobileEntity_1 = require("@permadeath/game/dist/entities/MobileEntity");
const dist_1 = require("@permadeath/utils/dist");
const consts_1 = require("@permadeath/game/dist/consts");
const MovementTypes_1 = require("@permadeath/game/dist/entities/movements/MovementTypes");
const { v1: uuidv1 } = require("uuid");
function fillZoneWithTestMobileEntities(numberOfEntities, zone) {
    const { territory } = zone;
    const { origin } = territory;
    const bottomRightCorner = new Point_1.Point(origin.x + territory.width, origin.y + territory.height);
    for (let i = numberOfEntities; i > 0; i--) {
        const id = uuidv1();
        zone.entities.mobile[id] = new MobileEntity_1.MobileEntity(id, id, new Point_1.Point((origin.x + bottomRightCorner.x) / 2, (origin.y + bottomRightCorner.y) / 2), (0, dist_1.randomInt)(1, 2), MovementTypes_1.MovementTypes.MoveTowardDestinationAndAssignNewIfReached, new Point_1.Point((0, dist_1.randomInt)(0, consts_1.worldWidth), (0, dist_1.randomInt)(0, consts_1.worldHeight)));
    }
}
exports.default = fillZoneWithTestMobileEntities;
