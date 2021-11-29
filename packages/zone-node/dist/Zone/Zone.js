"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zone = void 0;
const Point_1 = require("@permadeath/game/src/base/Point");
const consts_1 = require("@permadeath/game/dist/consts");
class Zone {
    constructor(id, origin, width, height) {
        this.id = id;
        this.territory = {
            origin: origin,
            width: width,
            height: height,
        };
        this.entities = {};
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
                origin: new Point_1.Point(this.territory.origin.x, this.territory.origin.y),
                height: this.borderThickness,
                width: this.territory.width,
                entities: {},
            },
            south: {
                origin: new Point_1.Point(this.territory.origin.x, this.territory.height - this.borderThickness),
                height: this.borderThickness,
                width: this.territory.width,
                entities: {},
            },
            east: {
                origin: new Point_1.Point(this.territory.origin.x, this.territory.origin.y),
                height: this.territory.height,
                width: this.borderThickness,
                entities: {},
            },
            west: {
                origin: new Point_1.Point(this.territory.width - this.borderThickness, this.territory.origin.y),
                height: this.territory.height,
                width: this.borderThickness,
                entities: {},
            },
        };
        this.corners = {
            width,
            height: this.borderThickness,
            northEast: {
                origin: new Point_1.Point(this.territory.origin.x + this.territory.width - this.borderThickness, this.territory.origin.y),
                entities: {},
            },
            northWest: {
                origin: new Point_1.Point(this.territory.origin.x, this.territory.origin.y),
                entities: {},
            },
            southEast: {
                origin: new Point_1.Point(this.territory.origin.x + this.territory.width, this.territory.origin.y + this.territory.height - this.borderThickness),
                entities: {},
            },
            southWest: {
                origin: new Point_1.Point(this.territory.origin.x, this.territory.origin.y + this.territory.height - this.borderThickness),
                entities: {},
            },
        };
    }
}
exports.Zone = Zone;
