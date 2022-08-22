"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addArrivingEntitiesToZone_1 = __importDefault(require("./entity-zone-transfers/addArrivingEntitiesToZone"));
const handOffDepartingEntitiesToNeighbor_1 = __importDefault(require("./entity-zone-transfers/handOffDepartingEntitiesToNeighbor"));
const determineEntitiesOfInterestToNeighbors_1 = __importDefault(require("./process-entity-updates/determineEntitiesOfInterestToNeighbors"));
const determineZoneDepartures_1 = __importDefault(require("./process-entity-updates/determineZoneDepartures"));
const moveEntity_1 = __importDefault(require("./process-entity-updates/moveEntity"));
const publishEdgeEntitiesForNeigborZones_1 = __importDefault(require("./process-entity-updates/publishEdgeEntitiesForNeigborZones"));
exports.default = (zone, publisher, tickRate) => {
    return setInterval(() => {
        const departingEntitiesByDestinationZoneId = {};
        const entitiesOfInterestToNeighbors = {};
        for (const entityId in zone.entities.mobile) {
            const currEntity = zone.entities.mobile[entityId];
            (0, moveEntity_1.default)(currEntity);
            (0, determineZoneDepartures_1.default)(currEntity, zone, departingEntitiesByDestinationZoneId);
            (0, determineEntitiesOfInterestToNeighbors_1.default)(currEntity, zone, entitiesOfInterestToNeighbors);
        }
        // if (zone.id === 1) console.log(entitiesOfInterestToNeighbors);
        for (const zoneId in departingEntitiesByDestinationZoneId) {
            (0, publishEdgeEntitiesForNeigborZones_1.default)(entitiesOfInterestToNeighbors[zoneId], zoneId, zone, publisher);
            (0, handOffDepartingEntitiesToNeighbor_1.default)(departingEntitiesByDestinationZoneId[zoneId], zoneId, zone, publisher);
        }
        (0, addArrivingEntitiesToZone_1.default)(zone);
    }, tickRate);
};
