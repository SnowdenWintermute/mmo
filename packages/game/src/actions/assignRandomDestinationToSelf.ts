import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import BehavioralEntity from "../entities/BehavioralEntity";
import { randomInt } from "@permadeath/utils/dist";
import { worldHeight, worldWidth } from "../consts";
import { Point } from "../base/Point";

export default function assignRandomDestinationToSelf(entity: BehavioralEntity, zone: Zone) {
  entity.destination = new Point(randomInt(0, worldWidth), randomInt(0, worldHeight));
}
