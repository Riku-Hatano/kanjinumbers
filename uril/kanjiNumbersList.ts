interface kanjiNumbersList {
  digits: {
    [key: string]: number;
  };
  chars: {
    [key: string]: number;
  };
}

const kanjiNumbersList: kanjiNumbersList = {
  digits: {
    拾: 10,
    百: 100,
    千: 1000,
    万: 10000,
    億: 100000000,
    兆: 1000000000000,
  },
  chars: {
    零: 0,
    壱: 1,
    弍: 2,
    参: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
  },
};

interface KanjiNumbersList {
  kanjiDigits: string[];
  kanjiChars: string[];
  numberDigits: number[];
  numberChars: number[];
}
export const KanjiNumbersList = (): KanjiNumbersList => {
  const returnValue: KanjiNumbersList = {
    kanjiDigits: [],
    kanjiChars: [],
    numberDigits: [],
    numberChars: [],
  };

  for (let key in kanjiNumbersList.chars) {
    returnValue.kanjiChars.push(key);
    returnValue.numberChars.push(kanjiNumbersList.chars[key]);
  }
  for (let key in kanjiNumbersList.digits) {
    returnValue.kanjiDigits.push(key);
    returnValue.numberDigits.push(kanjiNumbersList.digits[key]);
  }
  return returnValue;
};
