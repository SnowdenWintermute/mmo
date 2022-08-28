import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import { EntityZoneBoolean } from "../../base/EntityZoneBoolean";
import BehavioralEntity from "../BehavioralEntity";

export default class Action {
  typeId: number;
  requirements: EntityZoneBoolean[];
  effect: (entity: BehavioralEntity, zone: Zone) => void;
  timeInitiated: number | null;
  duration?: number;
  onInitiated?: (entity: BehavioralEntity, zone: Zone) => void;
  onCancelled?: (entity: BehavioralEntity, zone: Zone) => void;
  onCompleted?: (entity: BehavioralEntity, zone: Zone) => void;
  constructor(
    typeId: number,
    requirements: EntityZoneBoolean[],
    effect: (entity: BehavioralEntity, zone: Zone) => void,
    duration?: number,
    onInitiated?: (entity: BehavioralEntity, zone: Zone) => void,
    onCancelled?: (entity: BehavioralEntity, zone: Zone) => void,
    onCompleted?: (entity: BehavioralEntity, zone: Zone) => void
  ) {
    this.typeId = typeId;
    this.requirements = requirements;
    this.effect = effect;
    this.timeInitiated = Date.now();
    this.duration = duration ? duration : undefined;
    this.onInitiated = onInitiated;
    this.onCancelled = onCancelled;
    this.onCompleted = onCompleted;
  }
}
