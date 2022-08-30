import BehavioralEntity from "@permadeath/game/dist/entities/BehavioralEntity";
import { Entity } from "@permadeath/game/dist/entities/Entity";

export type EntitiesById = { [id: string]: BehavioralEntity | Entity };

export type EntitiesByZoneId = {
  [zoneId: string]: { [id: string]: BehavioralEntity | Entity };
};
