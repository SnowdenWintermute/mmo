import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";

export default function moveEntity(entity: MobileEntity) {
  entity.move();
  // check collisions and correct for them
  // check forced movements imposed by other entitys or effects
}
