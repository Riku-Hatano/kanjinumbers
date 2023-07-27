import { KanjiNumbersList } from "../../../../uril/kanjiNumbersList";

export const KanjiMultiplyFunc = (char: string, digit: string): number => {
    const { kanjiDigits, kanjiChars, numberDigits, numberChars } = KanjiNumbersList();
    return numberChars[kanjiChars.indexOf(char)] * numberDigits[kanjiDigits.indexOf(digit)];
}