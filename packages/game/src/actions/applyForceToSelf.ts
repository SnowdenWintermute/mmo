import { Zone } from "../Zone/Zone";
import { Body, Vector } from "matter-js";
import { BehavioralEntity } from "../entities/BehavioralEntity";

export default function applyForceToSelf(entity: BehavioralEntity, zone: Zone) {
  if (!entity.destination) return new Error("entity has no destination");
  const force = 0.01;
  const deltaVector = Vector.sub(entity.destination, entity.body.position);
  const normalizedDelta = Vector.normalise(deltaVector);
  const forceVector = Vector.mult(normalizedDelta, force);
  Body.applyForce(entity.body, entity.body.position, forceVector);
}
