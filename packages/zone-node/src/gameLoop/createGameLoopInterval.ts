import Zone from "../Zone/Zone";

export default (zone: Zone, tickRate: number) =>
  setInterval(() => {
    for (const mob in zone.entities.mobile) {
      zone.entities.mobile[mob].move();
    }
    console.log(zone.entities.mobile);
  }, tickRate);
