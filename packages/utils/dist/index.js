"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomArrayMobileEntitiesInArea = exports.loopClg = exports.randomInt = void 0;
const MobileEntity_1 = require("@permadeath/game/dist/entities/MobileEntity");
const Point_1 = require("@permadeath/game/dist/base/Point");
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
exports.randomInt = randomInt;
const loopClg = (props, loopTime) => {
    setInterval(() => {
        console.log(props);
    }, loopTime);
    //
};
exports.loopClg = loopClg;
const createRandomArrayMobileEntitiesInArea = (numberOfEntities, area) => {
    const entities = [];
    for (let i = numberOfEntities; i > 0; i--)
        entities.push(new MobileEntity_1.MobileEntity("entity " + i, new Point_1.Point((0, exports.randomInt)(area.topLeft.x, area.botRight.x), (0, exports.randomInt)(area.topLeft.y, area.botRight.y)), (0, exports.randomInt)(1, 5), (pos, speed) => {
            pos.x += Math.random() >= 0.5 ? 1 : -1 * speed;
            pos.y += Math.random() >= 0.5 ? 1 : -1 * speed;
        }));
    return entities;
};
exports.createRandomArrayMobileEntitiesInArea = createRandomArrayMobileEntitiesInArea;
