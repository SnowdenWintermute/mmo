import { Point } from "@permadeath/game/dist/base/Point";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { randomInt } from "@permadeath/utils/dist";
import Zone from "../Zone/Zone";

export default function fillZoneWithTestMobileEntities(
  numberOfEntities: number,
  zone: Zone
) {
  const { territory } = zone;
  const { origin } = territory;
  const bottomRightCorner = new Point(
    origin.x + territory.width,
    origin.y + territory.height
  );
  for (let i = numberOfEntities; i > 0; i--)
    zone.entities.mobile[i] = new MobileEntity(
      "entity " + i,
      new Point(
        (origin.x + bottomRightCorner.x) / 2,
        (origin.y + bottomRightCorner.y) / 2
      ),
      randomInt(1, 5),
      (pos: Point, speed: number) => {
        pos.x += Math.random() >= 0.5 ? 1 : -1 * speed;
        pos.y += Math.random() >= 0.5 ? 1 : -1 * speed;
      }
    );
}
