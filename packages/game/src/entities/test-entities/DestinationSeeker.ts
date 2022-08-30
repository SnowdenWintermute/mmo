import BehavioralEntity from "../BehavioralEntity";
import { BehaviorTypes } from "../../behaviors/BehaviorTypes";

export default class DestinationSeeker extends BehavioralEntity {
  constructor(
    id: string,
    name: string,
    body: Matter.Body,
    accelerationInducement?: number | null,
    hp?: { max: number; current: number }
  ) {
    super(
      id,
      name,
      body,
      [BehaviorTypes.CHOOSES_RANDOM_DESTINATIONS, BehaviorTypes.STARTS_MOVING_TOWARD_DESTINATION],
      accelerationInducement,
      hp
    );
  }
}
