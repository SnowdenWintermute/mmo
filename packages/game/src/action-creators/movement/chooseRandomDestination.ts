import Action from "../Action";
import { ActionIds } from "../ActionIds";
import entityHasNoDestination from "../../behaviors/prerequisites/entityHasNoDestination";
import assignRandomDestinationToSelf from "../../action-effects/assignRandomDestinationToSelf";

export const chooseRandomDestination = () =>
  new Action(ActionIds.CHOOSE_RANDOM_DESTINATION, [entityHasNoDestination], [assignRandomDestinationToSelf]);
