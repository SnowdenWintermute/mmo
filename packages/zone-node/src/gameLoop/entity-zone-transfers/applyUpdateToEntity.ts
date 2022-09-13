import { BehavioralEntity, Entity } from "../../../../game";
import { setBodyPropertiesFromAnother } from "../../../../utils";
const cloneDeep = require("lodash.clonedeep");

export default function applyUpdateToEntity(entity: Entity | BehavioralEntity, update: Entity | BehavioralEntity) {
  setBodyPropertiesFromAnother(entity.body, update.body);
  let key: keyof typeof update;
  for (key in update) if (key !== "body") entity[key] = cloneDeep(update[key]);
}
