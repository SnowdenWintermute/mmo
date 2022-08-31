import Zone from "@permadeath/game/dist/Zone/Zone";
import { Point } from "@permadeath/game/dist/base/Point.js";
import { worldHeight, worldWidth } from "@permadeath/game/dist/consts";

const podIp = process.env.MY_POD_IP;

export default function setUpZoneBasedOnPodId(podId: number) {
  if (!podIp) throw new Error("no ip address supplied by environment variable");
  let zone;
  if (podId === 0) zone = new Zone(podId, podIp, new Point(0, 0), worldWidth / 2, worldHeight);
  else if (podId === 1) zone = new Zone(podId, podIp, new Point(worldWidth / 2, 0), worldWidth / 2, worldHeight / 2);
  // else if (podId == 2) zone = new Zone(podId, podIp, new Point(0, worldHeight / 2), worldWidth / 2, worldHeight / 2);
  else zone = new Zone(podId, podIp, new Point(worldWidth / 2, worldHeight / 2), worldWidth / 2, worldHeight / 2);
  console.log(`Zone ${podId} created`);
  return zone;
}
