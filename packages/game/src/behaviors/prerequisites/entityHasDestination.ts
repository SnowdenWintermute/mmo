import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import { Point } from "../..";
import BehavioralEntity from "../../entities/BehavioralEntity";

export default function entityHasDestination(entity: BehavioralEntity, zone: Zone): boolean {
  return typeof entity.destination === Point;
}
