"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Zone_1 = __importDefault(require("../Zone"));
const Point_js_1 = require("@permadeath/game/dist/base/Point.js");
const consts_1 = require("@permadeath/game/dist/consts");
const podIp = process.env.MY_POD_IP;
function setUpZoneBasedOnPodId(podId) {
    if (!podIp)
        throw new Error("no ip address supplied by environment variable");
    let zone;
    if (podId === 0)
        zone = new Zone_1.default(podId, podIp, new Point_js_1.Point(0, 0), consts_1.worldWidth / 2, consts_1.worldHeight / 2);
    else if (podId === 1)
        zone = new Zone_1.default(podId, podIp, new Point_js_1.Point(consts_1.worldWidth / 2, 0), consts_1.worldWidth / 2, consts_1.worldHeight / 2);
    else if (podId == 2)
        zone = new Zone_1.default(podId, podIp, new Point_js_1.Point(0, consts_1.worldHeight / 2), consts_1.worldWidth / 2, consts_1.worldHeight / 2);
    else
        zone = new Zone_1.default(podId, podIp, new Point_js_1.Point(consts_1.worldWidth / 2, consts_1.worldHeight / 2), consts_1.worldWidth / 2, consts_1.worldHeight / 2);
    console.log(`Zone ${podId} created`);
    return zone;
}
exports.default = setUpZoneBasedOnPodId;
