import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import BehavioralEntity from "../entities/BehavioralEntity";

export type Action = (entity: BehavioralEntity, zone: Zone) => void;
