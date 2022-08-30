import Behavior from "../Behavior";
import { BehaviorTypes } from "../BehaviorTypes";
import entityHasDestination from "../prerequisites/entityHasDestination";
import destinationAndPositionNotWithinRadius from "../prerequisites/destinationAndPositionNotWithinRadius";
import { ActionIds } from "../../action-creators/ActionIds";

export const startsMovingTowardDestination = new Behavior(
  BehaviorTypes.STARTS_MOVING_TOWARD_DESTINATION,
  [],
  [destinationAndPositionNotWithinRadius, entityHasDestination],
  [ActionIds.ACCELERATE_SELF_TOWARD_DESTINATION]
);
