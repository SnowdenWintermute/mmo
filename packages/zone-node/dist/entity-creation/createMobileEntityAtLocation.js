"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("@permadeath/game/dist/base/Point");
const consts_1 = require("@permadeath/game/dist/consts");
const MobileEntity_1 = require("@permadeath/game/dist/entities/MobileEntity");
const repeatedlyMoveTowardRandomDestinations_1 = __importDefault(require("@permadeath/game/dist/entities/movements/repeatedlyMoveTowardRandomDestinations"));
const dist_1 = require("@permadeath/utils/dist");
const { v1: uuidv1 } = require("uuid");
function createMobileEntityAtLocation(zone, data) {
    const { location } = data;
    const id = uuidv1();
    zone.entities.mobile[id] = new MobileEntity_1.MobileEntity(id, id, location, (0, dist_1.randomInt)(1, 3), repeatedlyMoveTowardRandomDestinations_1.default, new Point_1.Point((0, dist_1.randomInt)(0, consts_1.worldWidth), (0, dist_1.randomInt)(0, consts_1.worldHeight)));
}
exports.default = createMobileEntityAtLocation;
