import BehavioralEntity from "../entities/BehavioralEntity";
import Zone from "../Zone/Zone";

export type EntityZoneBoolean = (entity: BehavioralEntity, zone: Zone) => boolean;
