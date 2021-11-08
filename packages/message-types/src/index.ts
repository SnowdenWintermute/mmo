exports.testText = "test shared text";
export const UserInput = class UserInput {
  sender: string;
  data: string;
  constructor(sender: string, data: string) {
    this.sender = sender;
    this.data = data;
  }
};

export const add = (a: number, b: number, c: number) => a + b + c + 10;
