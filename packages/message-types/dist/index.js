"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.UserInput = void 0;
exports.testText = "test shared text";
const UserInput = class UserInput {
  constructor(sender, data) {
    this.sender = sender;
    this.data = data;
  }
};
exports.UserInput = UserInput;
const add = (a, b, c) => a + b + c + 20;
exports.add = add;
