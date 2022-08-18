"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createMobileEntityAtLocation_1 = __importDefault(require("../../entity-creation/createMobileEntityAtLocation"));
function handleProxiedClientRequests(message, zone) {
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === "create-mobile-entity-at-location") {
        (0, createMobileEntityAtLocation_1.default)(zone, parsedMessage.data);
    }
}
exports.default = handleProxiedClientRequests;
