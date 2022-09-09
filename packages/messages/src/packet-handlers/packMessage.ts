import { Message } from "../Message";
const replicator = new (require("replicator"))();

export function packMessage(message: Message) {
  return replicator.encode(message);
}
