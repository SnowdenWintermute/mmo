import { BehavioralEntity, Entity } from "../../../game";
const clonedeep = require("lodash.clonedeep");
export function packEntity(entity: BehavioralEntity | Entity) {
  const packed = clonedeep(entity);
  packed.body = {
    x: entity.body.position.x,
    y: entity.body.position.y,
    r: entity.body.circleRadius,
    id: entity.body.id,
  };
  return packed;
}
