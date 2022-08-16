import Zone from "../Zone/Zone";

export default (zone: Zone, tickRate: number) =>
  setInterval(() => {
    for (const mob in zone.entities.mobile) {
      zone.entities.mobile[mob].move();
      const territory = zone.territory.current;
      const rightEdge = territory.origin.x + territory.width;
      const bottomEdge = territory.origin.y + territory.height;
      const topEdge = territory.origin.y;
      const leftEdge = territory.origin.x;
      // if(zone.entities.mobile[mob].pos.x<rightEdge)
    }
  }, tickRate);
