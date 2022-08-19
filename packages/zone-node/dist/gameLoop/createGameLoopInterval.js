"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handOffDepartingEntitiesToNeighbors_1 = __importDefault(require("./entity-zone-transfers/handOffDepartingEntitiesToNeighbors"));
const moveEntitiesAndDetermineZoneDepartures_1 = __importDefault(require("./process-entity-updates/moveEntitiesAndDetermineZoneDepartures"));
exports.default = (zone, publisher, tickRate) => {
    return setInterval(() => {
        const departingEntitiesByDestination = (0, moveEntitiesAndDetermineZoneDepartures_1.default)(zone);
        (0, handOffDepartingEntitiesToNeighbors_1.default)(zone, publisher);
    }, tickRate);
};
