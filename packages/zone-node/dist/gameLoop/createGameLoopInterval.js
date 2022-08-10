"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (zone, tickRate) => setInterval(() => {
    for (const mob in zone.entities.mobile) {
        zone.entities.mobile[mob].move();
        if (zone.entities.mobile[mob].pos.x < 0)
            zone.entities.mobile[mob].pos.x = 0;
        if (zone.entities.mobile[mob].pos.y < 0)
            zone.entities.mobile[mob].pos.y = 0;
    }
}, tickRate);
