//starting level of the game
export const START_COUNT = 2;

//enum (array) for colors
export enum COLORS {
  red,
  green,
  blue,
  yellow
}

//sleep - Promise
export const sleep = async time => { 
  return new Promise(resolve => setTimeout(resolve, time));
}