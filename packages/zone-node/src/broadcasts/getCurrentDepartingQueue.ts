import { Zone } from "../../../game";

export default function getCurrentDepartingQueue(zone: Zone) {
  const sliceToReturn = [];
  const departingQueueLength = zone.queues.departingEntities.length;
  for (let i = 0; i < departingQueueLength; i++) {
    const update = zone.queues.departingEntities.pop();
    if (update) sliceToReturn.push(update);
  }
  return sliceToReturn;
}
