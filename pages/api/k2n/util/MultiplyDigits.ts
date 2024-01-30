import { KanjiNumbersList } from "../../../../uril/kanjiNumbersList";
const { kanjiDigits, numberDigits } = KanjiNumbersList();

export const MultiplyDigit = (chunkNum: number, digit: string): number => {
  return chunkNum * numberDigits[kanjiDigits.indexOf(digit)];
};
