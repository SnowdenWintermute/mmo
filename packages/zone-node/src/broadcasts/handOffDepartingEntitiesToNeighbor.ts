import { Message, MessageTypes, packEntity, packMessage } from "../../../messages";
import { EntitiesByZoneId, Zone } from "../../../game";
import { RedisClientType } from "@redis/client";
import Matter from "matter-js";

export default function handOffDepartingEntitiesToNeighbor(
  zoneId: string,
  zone: Zone,
  engine: Matter.Engine,
  publisher: RedisClientType
) {
  const { departing } = zone.entities;
  if (!departing[zoneId]) return;
  let entityId: string;
  for (entityId in departing[zoneId]) {
    const currEntity = departing[zoneId][entityId];
    // @todo: send write request to db about this entity's location
    const packedMessage = packMessage(new Message(MessageTypes.ENTITY_HANDOFF, currEntity));
    Matter.Composite.remove(engine.world, currEntity.body);
    publisher.publish(`zone-${zoneId}`, packedMessage);
    delete zone.entities.agents[entityId];
  }
}
