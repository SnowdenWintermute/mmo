const replicator = new (require("replicator"))();

export function unpackMessage(message: string) {
  return replicator.decode(message);
}
