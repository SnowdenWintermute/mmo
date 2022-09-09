import { Zone } from "../../../game/src";
import { packZone } from "../../../messages";

export default function createZonesUpdateForClient(zones: { [id: string]: Zone }) {
  const zonesToSend: { [id: string]: Zone } = {};
  for (const zoneId in zones) zonesToSend[zoneId] = packZone(zones[zoneId]);
  return zonesToSend;
}
