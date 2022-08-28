import Action from "../../actions/Action";
import Behavior from "../Behavior";
import { BehaviorTypes } from "../BehaviorTypes";
import entityHasDestination from "../prerequisites/entityHasDestination";
import destinationAndPositionNotEqual from "../prerequisites/destinationAndPositionNotEqual";
import { EntityZoneBoolean } from "../../../base/EntityZoneBoolean";
import { ActionIds } from "../../actions/ActionIds";

export const startsMovingTowardDestination = new Behavior(
  BehaviorTypes.STARTS_MOVING_TOWARD_DESTINATION,
  [],
  [destinationAndPositionNotEqual, entityHasDestination],
  [ActionIds.ACCELERATE_SELF_TOWARD_DESTINATION]
);

// destinationAndPositionNotEqual
