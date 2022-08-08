import Zone from "../Zone/Zone";

export default (zone: Zone, tickRate: number) =>
  setInterval(() => {
    for (const mob in zone.entities.mobile) {
      zone.entities.mobile[mob].move();
      if (zone.entities.mobile[mob].pos.x < 0)
        zone.entities.mobile[mob].pos.x = 0;
      if (zone.entities.mobile[mob].pos.y < 0)
        zone.entities.mobile[mob].pos.y = 0;
    }
  }, tickRate);
