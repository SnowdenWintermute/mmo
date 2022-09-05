import Matter from "matter-js";
export class Entity {
  id: string;
  name: string;
  body: Matter.Body;
  hp?: {
    max: number;
    current: number;
  } | null;
  constructor(
    id: string,
    name: string,
    body: Matter.Body,
    hp: {
      max: number;
      current: number;
    } | null
  ) {
    this.id = id;
    this.name = name;
    this.body = body;
    this.hp = hp || null;
  }
}
