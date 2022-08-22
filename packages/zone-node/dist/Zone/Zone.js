"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneStatus = void 0;
const Point_js_1 = require("@permadeath/game/dist/base/Point.js");
const consts_1 = require("@permadeath/game/dist/consts");
const Rectangles_1 = require("@permadeath/game/dist/base/Rectangles");
var ZoneStatus;
(function (ZoneStatus) {
    ZoneStatus[ZoneStatus["UNASSIGNED"] = 0] = "UNASSIGNED";
    ZoneStatus[ZoneStatus["NOMINAL"] = 1] = "NOMINAL";
    ZoneStatus[ZoneStatus["REQUESTING_SUPPORT"] = 2] = "REQUESTING_SUPPORT";
    ZoneStatus[ZoneStatus["SHRINKING"] = 3] = "SHRINKING";
    ZoneStatus[ZoneStatus["GROWING"] = 4] = "GROWING";
})(ZoneStatus = exports.ZoneStatus || (exports.ZoneStatus = {}));
class Zone {
    constructor(id, ip, origin, width, height) {
        this.id = id;
        this.ip = ip;
        this.status = ZoneStatus.UNASSIGNED;
        this.territory = new Rectangles_1.Rectangle(origin, width, height);
        this.externalAreaOfInterest = new Rectangles_1.Rectangle(new Point_js_1.Point(origin.x - consts_1.playerMaxViewDistance, origin.y - consts_1.playerMaxViewDistance), width + consts_1.playerMaxViewDistance * 2, height + consts_1.playerMaxViewDistance * 2);
        this.entities = {
            arriving: [],
            static: {},
            mobile: {},
        };
        this.players = {};
        this.neighboringZones = {};
    }
}
exports.default = Zone;
