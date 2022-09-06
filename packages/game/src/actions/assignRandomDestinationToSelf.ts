import { BehavioralEntity } from "../entities/BehavioralEntity";
import { randomInt } from "../../../utils";
import { worldHeight, worldWidth } from "../consts";
import { Point } from "../base/Point";

export default function assignRandomDestinationToSelf(entity: BehavioralEntity) {
  entity.destination = new Point(randomInt(0, worldWidth), randomInt(0, worldHeight));
}
