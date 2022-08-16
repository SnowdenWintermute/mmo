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
            current: {
                origin: origin,
                width: width,
                height: height,
            },
            target: {
                origin: origin,
                width: width,
                height: height,
            },
        };
        this.entities = {
            static: {},
            mobile: {},
        };
        this.players = {};
        this.borderingZoneEntities = {
            north: {},
            south: {},
            east: {},
            west: {},
            northEast: {},
            northWest: {},
            southEast: {},
            southWest: {},
        };
        this.borderThickness = consts_1.playerMaxViewDistance;
        this.borders = {
            north: {
                origin: new Point_js_1.Point(this.territory.current.origin.x, this.territory.current.origin.y),
                width: this.territory.current.width,
                height: this.borderThickness,
                borderingZoneIds: null,
                entities: {},
            },
            south: {
                origin: new Point_js_1.Point(this.territory.current.origin.x, this.territory.current.origin.y +
                    this.territory.current.height -
                    this.borderThickness),
                width: this.territory.current.width,
                height: this.borderThickness,
                borderingZoneIds: null,
                entities: {},
            },
            east: {
                origin: new Point_js_1.Point(this.territory.current.origin.x +
                    this.territory.current.width -
                    this.borderThickness, this.territory.current.origin.y),
                width: this.borderThickness,
                height: this.territory.current.height,
                borderingZoneIds: null,
                entities: {},
            },
            west: {
                origin: new Point_js_1.Point(this.territory.current.origin.x, this.territory.current.origin.y),
                width: this.borderThickness,
                height: this.territory.current.height,
                borderingZoneIds: null,
                entities: {},
            },
        };
        this.corners = {
            northEast: {
                width,
                height: this.borderThickness,
                origin: new Point_js_1.Point(this.territory.current.origin.x +
                    this.territory.current.width -
                    this.borderThickness, this.territory.current.origin.y),
                entities: {},
            },
            northWest: {
                width,
                height: this.borderThickness,
                origin: new Point_js_1.Point(this.territory.current.origin.x, this.territory.current.origin.y),
                entities: {},
            },
            southEast: {
                width,
                height: this.borderThickness,
                origin: new Point_js_1.Point(this.territory.current.origin.x + this.territory.current.width, this.territory.current.origin.y +
                    this.territory.current.height -
                    this.borderThickness),
                entities: {},
            },
            southWest: {
                width,
                height: this.borderThickness,
                origin: new Point_js_1.Point(this.territory.current.origin.x, this.territory.current.origin.y +
                    this.territory.current.height -
                    this.borderThickness),
                entities: {},
            },
        };
    }
}
exports.default = Zone;
