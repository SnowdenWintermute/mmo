/// <reference types="node" />
import { RedisClientType } from "@redis/client";
import Zone from "../Zone/Zone";
declare const _default: (zone: Zone, publisher: RedisClientType, tickRate: number) => NodeJS.Timer;
export default _default;
