import { Body, Vector } from "matter-js";
import { BehavioralEntity } from "../entities/BehavioralEntity";

export default function moveSelfTowardDestination(entity: BehavioralEntity) {
  if (!entity.destination) return new Error("entity has no destination");
  // const force = 0.01;
  // const deltaVector = Vector.sub(entity.destination, entity.body.position);
  // const normalizedDelta = Vector.normalise(deltaVector);
  // const forceVector = Vector.mult(normalizedDelta, force);
  // Body.applyForce(entity.body, entity.body.position, forceVector);
  const { destination } = entity;
  const { position } = entity.body;

  const distance = Math.sqrt(Math.pow(destination.x - position.x, 2) + Math.pow(destination.y - position.y, 2));
  const directionX = (destination.x - position.x) / distance;
  const directionY = (destination.y - position.y) / distance;

  const newX = position.x + directionX;
  const newY = position.y + directionY;
  if (Math.sqrt(Math.pow(newX - position.x, 2) + Math.pow(newY - position.y, 2)) >= distance) {
    position.x = destination.x;
    position.y = destination.y;
  } else {
    position.x = newX;
    position.y = newY;
  }
  entity.body.position.x <= 1000 ? (entity.body.position.x += 1) : (entity.body.position.x -= 1);
}
