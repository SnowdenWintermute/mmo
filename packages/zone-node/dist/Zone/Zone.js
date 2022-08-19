"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneStatus = void 0;
const Point_js_1 = require("@permadeath/game/dist/base/Point.js");
const consts_1 = require("@permadeath/game/dist/consts");
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
        this.territory = {
            origin: origin,
            width: width,
            height: height,
        };
        this.entities = {
            static: {},
            mobile: {},
        };
        this.players = {};
        this.neighboringZones = {};
        this.edgeThickness = consts_1.playerMaxViewDistance;
        this.edges = {
            north: {
                origin: new Point_js_1.Point(this.territory.origin.x, this.territory.origin.y),
                width: this.territory.width,
                height: this.edgeThickness,
                entities: {},
            },
            south: {
                origin: new Point_js_1.Point(this.territory.origin.x, this.territory.origin.y + this.territory.height - this.edgeThickness),
                width: this.territory.width,
                height: this.edgeThickness,
                entities: {},
            },
            east: {
                origin: new Point_js_1.Point(this.territory.origin.x + this.territory.width - this.edgeThickness, this.territory.origin.y),
                width: this.edgeThickness,
                height: this.territory.height,
                entities: {},
            },
            west: {
                origin: new Point_js_1.Point(this.territory.origin.x, this.territory.origin.y),
                width: this.edgeThickness,
                height: this.territory.height,
                entities: {},
            },
        };
        this.corners = {
            northEast: {
                width,
                height: this.edgeThickness,
                origin: new Point_js_1.Point(this.territory.origin.x + this.territory.width - this.edgeThickness, this.territory.origin.y),
                entities: {},
            },
            northWest: {
                width,
                height: this.edgeThickness,
                origin: new Point_js_1.Point(this.territory.origin.x, this.territory.origin.y),
                entities: {},
            },
            southEast: {
                width,
                height: this.edgeThickness,
                origin: new Point_js_1.Point(this.territory.origin.x + this.territory.width, this.territory.origin.y + this.territory.height - this.edgeThickness),
                entities: {},
            },
            southWest: {
                width,
                height: this.edgeThickness,
                origin: new Point_js_1.Point(this.territory.origin.x, this.territory.origin.y + this.territory.height - this.edgeThickness),
                entities: {},
            },
        };
    }
}
exports.default = Zone;
