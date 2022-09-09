import { Body, Vector } from "matter-js";
import { tickRate } from "../consts";
import { BehavioralEntity } from "../entities/BehavioralEntity";

export default function moveSelfTowardDestination(entity: BehavioralEntity, timeOfLastUpdate: number) {
  if (!entity.destination) return new Error("entity has no destination");
  const deltaT = Date.now() - timeOfLastUpdate;
  const force = entity.body.density * 55 * 4.5 * (deltaT / tickRate);
  const deltaVector = Vector.sub(entity.destination, entity.body.position);
  const normalizedDelta = Vector.normalise(deltaVector);
  const forceVector = Vector.mult(normalizedDelta, force);
  Body.applyForce(entity.body, entity.body.position, forceVector);
}
