import { Point } from "@permadeath/game/dist/base/Point";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { randomInt } from "@permadeath/utils/dist";
import { worldHeight, worldWidth } from "@permadeath/game/dist/consts";
import Zone from "../Zone/Zone";

export default function fillZoneWithTestMobileEntities(
  numberOfEntities: number,
  zone: Zone
) {
  const { territory } = zone;
  const { origin } = territory.current;
  const bottomRightCorner = new Point(
    origin.x + territory.current.width,
    origin.y + territory.current.height
  );
  for (let i = numberOfEntities; i > 0; i--)
    zone.entities.mobile[i - 1] = new MobileEntity(
      "entity " + (i - 1),
      new Point(
        (origin.x + bottomRightCorner.x) / 2,
        (origin.y + bottomRightCorner.y) / 2
      ),
      randomInt(1, 2),
      (pos: Point, destination: Point, speed: number) => {
        if (
          pos.x <= 0 ||
          pos.y <= 0 ||
          pos.x >= 1000 ||
          pos.y >= 1000 ||
          (pos.x === destination.x && pos.y === destination.y)
        ) {
          destination.x = randomInt(0, worldWidth);
          destination.y = randomInt(0, worldHeight);
        }

        const elapsed = 33;
        const distance = Math.sqrt(
          Math.pow(destination.x - pos.x, 2) +
            Math.pow(destination.y - pos.y, 2)
        );
        const directionX = (destination.x - pos.x) / distance;
        const directionY = (destination.y - pos.y) / distance;

        const newX = pos.x + directionX * speed;
        const newY = pos.y + directionY * speed;
        if (
          Math.sqrt(Math.pow(newX - pos.x, 2) + Math.pow(newY - pos.y, 2)) >=
          distance
        ) {
          pos.x = destination.x;
          pos.y = destination.y;
        } else {
          pos.x = newX;
          pos.y = newY;
        }
      },
      new Point(randomInt(0, worldWidth), randomInt(0, worldHeight))
    );
}
