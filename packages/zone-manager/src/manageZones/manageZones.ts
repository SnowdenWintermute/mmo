import { Entity } from "@permadeath/game/dist/entities/Entity";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { Territory } from "@permadeath/zone-node/dist/Zone/types/Territory";
import Zone, { ZoneStatus } from "@permadeath/zone-node/dist/Zone/Zone";
import { RedisClientType } from "@redis/client";
import determineAdjustedTerritories from "./determineAdjustedTerritories";

export default function manageZones(
  zones: { [key: string]: Zone },
  client: RedisClientType
) {
  for (const zone in zones) {
    if (zones[zone].status === ZoneStatus.REQUESTING_SUPPORT) {
      // determine if any nearby zone has capacity to support more entities
      //    only works if the potential supporting zone is the only zone on that border
      // otherwise look for an unassigned zone to use
      const supportingZoneCurrentlyBordering =
        determineSupportingZoneCurrentlyBordering(zones);
      const adjustedTerritories: {
        zoneInNeed: Territory;
        supportingZone: Territory;
      } = determineAdjustedTerritories(zone);
    }
  }

  // SPLITTING

  // check each zone to see if it is reaching split capacity threshold (certain number of entities or cpu/mem usage)
  // check if there is a zone publishing on the zone-updates channel which is already bordering the zone in need
  //    - if yes, publish on the zone in need's personal channel that it should request to start a hand-off with the bordering zone via WS
  // if no bordering zone with extra capacity, check for a new zone on the zone-updates channel (would have no assigned territory)
  // assign territory to the new zone
  //    - place origin at the origin of the ZIN
  //    - determine if the ZIN should be split horizontally or vertically based on which even split
  //      of entities would yeild the most even split of territory
  //    - order the ZIN to initiate a ws connection with the new zone and hand off half it's entities (may need to do in batches)
  //    - as entities are handed off, the ZIN should also hand off the territory they occupy
  // MERGING
  // check each zone to see if it is reaching it's merge threshold
  // check if any nearby zone has excess capacity to accept the entities of the unpopulated zone
  // order the UZ to begin yeilding it's territory as it hands off entities in batches via websocket
}
