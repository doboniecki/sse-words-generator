import chance from 'chance';

const chanceInstance = chance();

export function wordsGenerator() {
  return chanceInstance.word();
}
