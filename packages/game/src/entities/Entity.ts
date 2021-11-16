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

  move = (angle: number) => {
    const newX = this.pos.x + this.speed * Math.cos((angle * Math.PI) / 180);
    const newY = this.pos.y + this.speed * Math.sin((angle * Math.PI) / 180);
    this.pos.x = newX;
    this.pos.y = newY;
  };
}
