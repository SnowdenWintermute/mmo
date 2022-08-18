// exports.testText = "test shared text";
export const UserInput = class UserInput {
  sender: string;
  data: string;
  constructor(sender: string, data: string) {
    this.sender = sender;
    this.data = data;
  }
};

export enum MessageTypes {
  ZONE_SPECIFIC_NEIGHBOR_TERRITORY_LIST = "ZONE_SPECIFIC_NEIGHBOR_TERRITORY_LIST",
}
