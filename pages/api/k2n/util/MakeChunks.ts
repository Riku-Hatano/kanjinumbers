import { KanjiNumbersList } from "../../../../uril/kanjiNumbersList";

const { kanjiDigits } = KanjiNumbersList();

export const MakeChunks = (kanji: string): string[] => {
  const kanjiChunks = [];
  let startPosition = 0;
  for (let i = 0; i < kanjiDigits.length - 3; i++) {
    //〜兆、〜億、〜万、それ以外(10, 409など位のつかない数字)に分ける。
    if (
      kanji.indexOf(kanjiDigits[kanjiDigits.length - 1 - i], startPosition) !==
      -1
    ) {
      kanjiChunks.push(
        kanji.slice(
          startPosition,
          kanji.indexOf(
            kanjiDigits[kanjiDigits.length - 1 - i],
            startPosition,
          ) + 1,
        ),
      );
      startPosition =
        kanji.indexOf(kanjiDigits[kanjiDigits.length - 1 - i], startPosition) +
        1;
    }
  }
  if (startPosition !== kanji.length) {
    kanjiChunks.push(kanji.slice(startPosition));
  }
  return kanjiChunks; //[ '四億', '五千弍百参拾万', '四千九百六拾弍' ]
};
