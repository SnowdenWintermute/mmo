import Matter from "matter-js";
import { Entity } from "..";
import { Point } from "../base/Point";
import { MovementTypes } from "./movements/MovementTypes";

export class MobileEntity extends Entity {
  movementType: number;
  destination: Point;
  speed: number;
  constructor(id: string, name: string, body: Matter.Body, speed: number, movementType: number, destination: Point) {
    super(id, name, body);
    this.speed = speed;
    this.destination = destination;
    this.movementType = movementType;
  }
}
