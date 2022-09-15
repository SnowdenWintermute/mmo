import { Zone } from "../../../game";

export default function getCurrentGhostUpdatesQueue(zone: Zone) {
  const sliceToReturn = [];
  const ghostUpdateRequestQueue = zone.queues.outgoingGhostUpdateRequests.length;
  for (let i = 0; i < ghostUpdateRequestQueue; i++) {
    const update = zone.queues.outgoingGhostUpdateRequests.shift();
    if (update) sliceToReturn.push(update);
  }
  return sliceToReturn;
}
