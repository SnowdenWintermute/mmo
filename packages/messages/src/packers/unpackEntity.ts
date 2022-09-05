import Matter from "matter-js";
import { BehavioralEntity } from "../../../game";
export function unpackEntity(packed: any) {
  const { id, name, body, behaviorType, destination, accelerationInducement, hp } = packed;
  const unpacked = new BehavioralEntity(
    id,
    name,
    Matter.Bodies.circle(body.x, body.y, body.r),
    behaviorType,
    destination,
    accelerationInducement,
    hp
  );
  return unpacked;
}
