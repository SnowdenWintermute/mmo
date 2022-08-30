import { playerMaxViewDistance } from "@permadeath/game/dist/consts/index";
import { Point } from "@permadeath/game/dist/base/Point";
import { DetailedRectangle } from "@permadeath/game/dist/base/Rectangles";
import { Entity } from "@permadeath/game/dist/entities/Entity";
import BehavioralEntity from "@permadeath/game/dist/entities/BehavioralEntity";
import Zone from "../../Zone/Zone";

export default function entityIsOnZoneEdge(entity: BehavioralEntity | Entity, zone: Zone) {
  const { origin, width, height } = zone.territory;
  const innerTerritory = new DetailedRectangle(
    new Point(origin.x + playerMaxViewDistance, origin.y + playerMaxViewDistance),
    width - playerMaxViewDistance * 2,
    height - playerMaxViewDistance * 2
  );
  if (!innerTerritory.containsPoint(entity.body.position)) return true;
  else return false;
}
