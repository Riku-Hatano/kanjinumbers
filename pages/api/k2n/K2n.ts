import { K2nException } from "./K2nException";
import { KanjiNumbersList } from "../../../uril/kanjiNumbersList";
import { MakeChunks } from "./util/MakeChunks";
import { KanjiMultiplyFunc } from "./util/KanjiMultiplyFunc";
import { MultiplyDigit } from "./util/MultiplyDigits";
import { returnValue } from "../../../types/returnValue";

export const K2n = (kanji: string): returnValue => {
  const { kanjiDigits, kanjiChars, numberChars } = KanjiNumbersList();
  let returnNum = 0;

  if (K2nException(kanji).status) {
    //入力できない数値をチェックする関数(K2nException)に異常がなかったとき、実際に漢数字からアラビア数字に書き換える処理を実行する
    const kanjiChunks = MakeChunks(kanji); //例）[ '四億', '五千弍百参拾万', '四千九百六拾弍' ]

    for (let i = 0; i < kanjiChunks.length; i++) {
      let digitFlag = false;
      let chunkNum = 0;

      for (let j = 0; j < kanjiDigits.length - 3; j++) {
        //桁の最後に”兆”、”億”、”万”がついているかチェックする
        if (
          kanjiChunks[i].indexOf(kanjiDigits[kanjiDigits.length - 1 - j]) !== -1
        ) {
          digitFlag = true;
        }
      }

      if (digitFlag) {
        //桁の最後に”兆”、”億”、”万”のいずれかがついている場合
        if (kanjiChunks[i].length % 2 === 0) {
          console.log("even with digit");
          for (let j = 0; j <= kanjiChunks[i].length / 2 - 1; j++) {
            //五千弍百参万の場合chunkNumに5*1000, 2*100, 3をループで追加していく。chunkNumは最終的には5203となり、31行目のMultiplyDigitで5203*10000=52030000となる
            if (j === kanjiChunks[i].length / 2 - 1) {
              //最後のループ(三周目)
              chunkNum +=
                numberChars[
                  kanjiChars.indexOf(kanjiChunks[i][kanjiChunks[i].length - 2])
                ]; //chunkNum += 3
              chunkNum = MultiplyDigit(
                chunkNum,
                kanjiChunks[i][kanjiChunks[i].length - 1],
              ); //chunkNum * 10000　この例だと”万”が桁の数なので10000をchunkNumにかける
            } else {
              chunkNum += KanjiMultiplyFunc(
                kanjiChunks[i][j * 2],
                kanjiChunks[i][j * 2 + 1],
              ); //chunkNum+=5000(一周目), chunkNum+=200(二周目)
            }
          }
        } else {
          console.log("odd with digit");
          for (let j = 0; j <= (kanjiChunks[i].length - 1) / 2; j++) {
            if (j === (kanjiChunks[i].length - 1) / 2) {
              chunkNum = MultiplyDigit(
                chunkNum,
                kanjiChunks[i][kanjiChunks[i].length - 1],
              );
            } else {
              chunkNum += KanjiMultiplyFunc(
                kanjiChunks[i][j * 2],
                kanjiChunks[i][j * 2 + 1],
              );
            }
          }
        }
      } else {
        //桁の最後に”兆”、”億”、”万”がついていない場合
        if (kanjiChunks[i].length % 2 === 0) {
          console.log("even widthout digit");
          for (let j = 0; j < (kanjiChunks[i].length - 1) / 2; j++) {
            chunkNum += KanjiMultiplyFunc(
              kanjiChunks[i][j * 2],
              kanjiChunks[i][j * 2 + 1],
            );
          }
        } else {
          console.log("odd widthout digit");
          for (let j = 0; j < (kanjiChunks[i].length - 1) / 2 + 1; j++) {
            if (j === (kanjiChunks[i].length - 1) / 2) {
              chunkNum +=
                numberChars[
                  kanjiChars.indexOf(kanjiChunks[i][kanjiChunks[i].length - 1])
                ];
            } else {
              chunkNum += KanjiMultiplyFunc(
                kanjiChunks[i][j * 2],
                kanjiChunks[i][j * 2 + 1],
              );
            }
          }
        }
      }
      returnNum += chunkNum;
    }
    return {
      status: true,
      statusCode: 200,
      result: returnNum.toString(),
    };
  } else {
    return {
      status: false,
      statusCode: 500,
      result: K2nException(kanji).message,
    };
  }
};
