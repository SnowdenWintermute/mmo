import { Point } from "../base/Point";
export class Entity {
  id: string;
  name: string;
  pos: Point;
  mass?: number;
  hp?: {
    max: number;
    current: number;
  };
  constructor(id: string, name: string, pos: Point, hp?: { max: number; current: number }, mass?: number) {
    this.id = id;
    this.name = name;
    this.pos = pos;
    this.hp = hp;
    this.mass = mass;
  }
}
