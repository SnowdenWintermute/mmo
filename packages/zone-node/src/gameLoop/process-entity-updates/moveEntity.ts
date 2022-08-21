import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import moveTowardDestinationAndAssignNewIfReached from "@permadeath/game/dist/entities/movements/moveTowardDestinationAndAssignNewIfReached";
import { MovementTypes } from "@permadeath/game/dist/entities/movements/MovementTypes";

export default function moveEntity(entity: MobileEntity) {
  if (entity.movementType === MovementTypes.MoveTowardDestinationAndAssignNewIfReached)
    moveTowardDestinationAndAssignNewIfReached(entity);
  // check collisions and correct for them
  // check forced movements imposed by other entitys or effects
}
