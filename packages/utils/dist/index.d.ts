import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { Point } from "@permadeath/game/dist/base/Point";
export declare const randomInt: (min: number, max: number) => number;
export declare const loopClg: (props: any, loopTime: number) => void;
export declare const createRandomArrayMobileEntitiesInArea: (numberOfEntities: number, area: {
    topLeft: Point;
    botRight: Point;
}) => MobileEntity[];
