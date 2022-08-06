import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { Point } from "@permadeath/game/dist/base/Point";

export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const loopClg = (props: any, loopTime: number) => {
  setInterval(() => {
    console.log(props);
  }, loopTime);
  //
};

export const createRandomArrayMobileEntitiesInArea = (
  numberOfEntities: number,
  area: { topLeft: Point; botRight: Point }
) => {
  const entities = [];
  for (let i = numberOfEntities; i > 0; i--)
    entities.push(
      new MobileEntity(
        "entity " + i,
        new Point(
          randomInt(area.topLeft.x, area.botRight.x),
          randomInt(area.topLeft.y, area.botRight.y)
        ),
        randomInt(1, 5),
        (pos: Point, speed: number) => {
          pos.x += Math.random() >= 0.5 ? 1 : -1 * speed;
          pos.y += Math.random() >= 0.5 ? 1 : -1 * speed;
        }
      )
    );
  console.log(entities);
  return entities;
};
