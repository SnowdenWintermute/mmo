import Matter from "matter-js";
import { BehavioralEntity } from "../../../game";
export function unpackEntity(packed: any) {
  const { id, name, body, behaviorType, destination, accelerationInducement, hp, currentAction } = packed;
  const unpacked = new BehavioralEntity(
    id,
    name,
    Matter.Bodies.circle(body.x, body.y, body.r, { frictionAir: 1 }),
    behaviorType,
    currentAction,
    destination,
    accelerationInducement,
    hp
  );
  unpacked.body.id = body.id;
  return unpacked;
}
