import Zone from "../Zone/Zone";
import BehavioralEntity from "../entities/BehavioralEntity";

export type Action = (entity: BehavioralEntity, zone: Zone) => void;
