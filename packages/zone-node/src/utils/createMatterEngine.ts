import Matter from "matter-js";

export default function createMatterEngine() {
  const engine = Matter.Engine.create();
  engine.gravity.y = 0;
  engine.gravity.x = 0;
  engine.gravity.scale = 0;
  return engine;
}
