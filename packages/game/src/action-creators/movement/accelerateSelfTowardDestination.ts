import destinationAndPositionNotWithinRadius from "../../behaviors/prerequisites/destinationAndPositionNotWithinRadius";
import entityHasDestination from "../../behaviors/prerequisites/entityHasDestination";
import Action from "../Action";
import { ActionIds } from "../ActionIds";
import applyForceToSelf from "../../action-effects/applyForceToSelf";

export const accelerateSelfTowardDestination = () =>
  new Action(
    ActionIds.ACCELERATE_SELF_TOWARD_DESTINATION,
    [entityHasDestination, destinationAndPositionNotWithinRadius],
    [applyForceToSelf]
  );
