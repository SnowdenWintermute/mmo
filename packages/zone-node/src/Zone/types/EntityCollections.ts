import { Entity } from "@permadeath/game/dist/entities/Entity";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";

export type EntitiesById = { [id: string]: MobileEntity | Entity };

export type EntitiesByZoneId = {
  [zoneId: string]: { [id: string]: MobileEntity | Entity };
};