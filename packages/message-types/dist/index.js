"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTypes = exports.UserInput = void 0;
// exports.testText = "test shared text";
const UserInput = class UserInput {
    constructor(sender, data) {
        this.sender = sender;
        this.data = data;
    }
};
exports.UserInput = UserInput;
var MessageTypes;
(function (MessageTypes) {
    MessageTypes["ZONE_SPECIFIC_NEIGHBOR_TERRITORY_LIST"] = "ZONE_SPECIFIC_NEIGHBOR_TERRITORY_LIST";
})(MessageTypes = exports.MessageTypes || (exports.MessageTypes = {}));
