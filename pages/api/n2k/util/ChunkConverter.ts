import { KanjiNumbersList } from "../../../../uril/kanjiNumbersList";

const { kanjiDigits, kanjiChars, numberDigits, numberChars } =
  KanjiNumbersList();
const digitArr = [1000, 100, 10, 1];

export const ChunkConverter = (chunk: string): string => {
  const chunkNum = parseInt(chunk);
  let remains = 0;
  let returnStr = "";

  if (chunkNum.toString().length === 1) {
    //入力された数字が一桁の場合
    returnStr = kanjiChars[numberChars.indexOf(chunkNum)];
  } else {
    //入力された数字が二桁以上の場合
    for (let i = 0; i < chunk.length; i++) {
      if (i === 0) {
        //一周目は元の数字を参照
        if (
          Math.floor(
            chunkNum / digitArr[i + (digitArr.length - chunk.length)],
          ) !== 0
        ) {
          returnStr +=
            kanjiChars[
              numberChars.indexOf(
                Math.floor(
                  chunkNum / digitArr[i + (digitArr.length - chunk.length)],
                ),
              )
            ];
          returnStr +=
            kanjiDigits[
              numberDigits.indexOf(
                digitArr[i + (digitArr.length - chunk.length)],
              )
            ];
        }
      } else {
        //二周目以降は元の数字のあまりを参照
        if (
          Math.floor(
            remains / digitArr[i + (digitArr.length - chunk.length)],
          ) !== 0
        ) {
          returnStr +=
            kanjiChars[
              numberChars.indexOf(
                Math.floor(
                  remains / digitArr[i + (digitArr.length - chunk.length)],
                ),
              )
            ];
          if (
            kanjiDigits[
              numberDigits.indexOf(
                digitArr[i + (digitArr.length - chunk.length)],
              )
            ] !== undefined
          ) {
            //numberDigitsには1は無いので、一の位を計算するときには必ずundefinedになる
            returnStr +=
              kanjiDigits[
                numberDigits.indexOf(
                  digitArr[i + (digitArr.length - chunk.length)],
                )
              ];
          }
        }
      }
      remains = chunkNum % digitArr[i + (digitArr.length - chunk.length)];
    }
  }
  return returnStr;
};
