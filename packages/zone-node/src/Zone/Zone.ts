// import { Point } from "@permadeath/game/src/base/Point";
// import { Entity } from "@permadeath/game";
// import { playerMaxViewDistance } from "@permadeath/game/src/consts";
// import { Territory } from "./types/Territory";
// export default class Zone {
//   id: number;
//   territory: Territory;
//   entities: { [name: string]: Entity };
//   players: Object;
//   borderingZoneEntities: Object;
//   borderThickness: number;
//   borders: Object;
//   corners: Object;
//   constructor(id: number, origin: Point, width: number, height: number) {
//     this.id = id;
//     this.territory = {
//       origin: origin,
//       width: width,
//       height: height,
//     };
//     this.entities = {};
//     this.players = {};
//     this.borderingZoneEntities = {
//       north: {},
//       south: {},
//       east: {},
//       west: {},
//       northEast: {},
//       northWest: {},
//       southEast: {},
//       southWest: {},
//     };
//     this.borderThickness = playerMaxViewDistance;
//     this.borders = {
//       north: {
//         origin: new Point(this.territory.origin.x, this.territory.origin.y),
//         height: this.borderThickness,
//         width: this.territory.width,
//         entities: {},
//       },
//       south: {
//         origin: new Point(
//           this.territory.origin.x,
//           this.territory.height - this.borderThickness
//         ),
//         height: this.borderThickness,
//         width: this.territory.width,
//         entities: {},
//       },
//       east: {
//         origin: new Point(this.territory.origin.x, this.territory.origin.y),
//         height: this.territory.height,
//         width: this.borderThickness,
//         entities: {},
//       },
//       west: {
//         origin: new Point(
//           this.territory.width - this.borderThickness,
//           this.territory.origin.y
//         ),
//         height: this.territory.height,
//         width: this.borderThickness,
//         entities: {},
//       },
//     };
//     this.corners = {
//       width,
//       height: this.borderThickness,
//       northEast: {
//         origin: new Point(
//           this.territory.origin.x + this.territory.width - this.borderThickness,
//           this.territory.origin.y
//         ),
//         entities: {},
//       },
//       northWest: {
//         origin: new Point(this.territory.origin.x, this.territory.origin.y),
//         entities: {},
//       },
//       southEast: {
//         origin: new Point(
//           this.territory.origin.x + this.territory.width,
//           this.territory.origin.y + this.territory.height - this.borderThickness
//         ),
//         entities: {},
//       },
//       southWest: {
//         origin: new Point(
//           this.territory.origin.x,
//           this.territory.origin.y + this.territory.height - this.borderThickness
//         ),
//         entities: {},
//       },
//     };
//   }
// }

// export class Test {
//   somenum: number;
//   constructor(somenum: number) {
//     this.somenum = somenum;
//   }
// }
