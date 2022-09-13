import { BehavioralEntity } from "../../entities/BehavioralEntity";
import { Entity } from "../../entities/Entity";

export type EntitiesById = { [id: string]: BehavioralEntity | Entity };

export type EntitiesByZoneId = {
  [zoneId: string]: { [id: string]: BehavioralEntity | Entity };
};

export type EntitiesWithZoneIds = { [id: string]: { entity: BehavioralEntity | Entity; zoneId: number } };
