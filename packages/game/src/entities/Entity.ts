import Matter from "matter-js";
export interface Entity {
  id: string;
  name: string;
  body: Matter.Body;
  hp?: {
    max: number;
    current: number;
  } | null;
}
