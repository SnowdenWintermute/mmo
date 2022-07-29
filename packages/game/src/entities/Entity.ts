import { Point } from "../base/Point";
export class Entity {
  name: string;
  pos: Point;
  speed: number;
  constructor(name: string, pos: Point, speed: number) {
    this.name = name;
    this.pos = pos;
    this.speed = speed;
  }
}
