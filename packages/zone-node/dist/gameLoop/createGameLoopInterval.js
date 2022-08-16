"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (zone, tickRate) => setInterval(() => {
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
