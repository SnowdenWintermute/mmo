import BehavioralEntity from "../entities/BehavioralEntity";
import Zone from "@permadeath/zone-node/dist/Zone/Zone";

export type EntityZoneBoolean = (entity: BehavioralEntity, zone: Zone) => boolean;
