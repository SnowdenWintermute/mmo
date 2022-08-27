import Matter from "matter-js";
import { Point } from "../base/Point";
export class Entity {
  id: string;
  name: string;
  body: Matter.Body;
  hp?: {
    max: number;
    current: number;
  } | null;
  constructor(id: string, name: string, body: Matter.Body, hp?: { max: number; current: number }) {
    this.id = id;
    this.name = name;
    this.body = body;
    this.hp = hp || null;
  }
}
