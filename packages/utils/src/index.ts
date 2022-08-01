export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const loopClg = (props: any, loopTime: number) => {
  setInterval(() => {
    console.log(props);
  }, loopTime);
  //
};
