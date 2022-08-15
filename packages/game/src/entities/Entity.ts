import { Point } from "../base/Point";
export class Entity {
  id: string;
  name: string;
  pos: Point;
  speed: number;
  constructor(id: string, name: string, pos: Point, speed: number) {
    this.id = id;
    this.name = name;
    this.pos = pos;
    this.speed = speed;
  }
}
