export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const loopClg = (props: any, loopTime: number) => {
  setInterval(() => {
    console.log(props);
  }, loopTime);
  //
};

export const between = (x: number, min: number, max: number) => {
  return x >= min && x <= max;
};

import Matter from "matter-js";
export const setBodyPropertiesFromAnother = (a: Matter.Body, b: Matter.Body) => {
  Matter.Body.setPosition(a, { x: b.position.x, y: b.position.y });
  Matter.Body.setInertia(a, b.inertia);
  Matter.Body.setVelocity(a, b.velocity);
  Matter.Body.setAngle(a, b.angle);
  Matter.Body.setAngularVelocity(a, b.angularVelocity);
};

// export const createRandomArrayMobileEntitiesInArea = (
//   numberOfEntities: number,
//   area: { topLeft: Point; botRight: Point }
// ) => {
//   const entities = [];
//   for (let i = numberOfEntities; i > 0; i--)
//     entities.push(
//       new MobileEntity(
//         "entity " + i,
//         new Point(
//           randomInt(area.topLeft.x, area.botRight.x),
//           randomInt(area.topLeft.y, area.botRight.y)
//         ),
//         randomInt(1, 5),
//         (pos: Point, speed: number) => {
//           pos.x += Math.random() >= 0.5 ? 1 : -1 * speed;
//           pos.y += Math.random() >= 0.5 ? 1 : -1 * speed;
//         }
//       )
//     );
//   console.log(entities);
//   return entities;
// };
