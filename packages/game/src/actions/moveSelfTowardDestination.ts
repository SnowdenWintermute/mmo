import { Body, Vector } from "matter-js";
import { BehavioralEntity } from "../entities/BehavioralEntity";

export default function moveSelfTowardDestination(entity: BehavioralEntity) {
  if (!entity.destination) return new Error("entity has no destination");
  const force = entity.body.density * 55 * 1.5;
  const deltaVector = Vector.sub(entity.destination, entity.body.position);
  const normalizedDelta = Vector.normalise(deltaVector);
  const forceVector = Vector.mult(normalizedDelta, force);
  Body.applyForce(entity.body, entity.body.position, forceVector);
}
