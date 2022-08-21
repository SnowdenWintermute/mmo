import { Entity } from "..";
import { Point } from "../base/Point";
import { MovementTypes } from "./movements/MovementTypes";

export class MobileEntity extends Entity {
  movementType: number;
  destination: Point;
  constructor(id: string, name: string, pos: Point, speed: number, movementType: number, destination: Point) {
    super(id, name, pos, speed);
    this.destination = destination;
    this.movementType = movementType;
  }
}
