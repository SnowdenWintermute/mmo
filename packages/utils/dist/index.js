"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.between = exports.loopClg = exports.randomInt = void 0;
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
exports.randomInt = randomInt;
const loopClg = (props, loopTime) => {
    setInterval(() => {
        console.log(props);
    }, loopTime);
    //
};
exports.loopClg = loopClg;
const between = (x, min, max) => {
    return x >= min && x <= max;
};
exports.between = between;
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
