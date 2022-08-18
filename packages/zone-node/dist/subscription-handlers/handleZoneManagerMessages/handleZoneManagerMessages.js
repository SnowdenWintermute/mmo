"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("@permadeath/message-types/dist");
function handleZoneManagerMessages(message, zone) {
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === dist_1.MessageTypes.ZONE_SPECIFIC_NEIGHBOR_IP_LIST) {
        //
        console.log(parsedMessage.data);
    }
}
exports.default = handleZoneManagerMessages;
