import { MessageTypes } from "./types";

export class Message {
  type: keyof typeof MessageTypes;
  data: any;
  constructor(type: keyof typeof MessageTypes, data: any) {
    this.type = type;
    this.data = data;
  }
}
