import { KanjiNumbersList } from "../../../uril/kanjiNumbersList";
import { MakeChunks } from "./util/MakeChunks";

interface returnValue {
  status: boolean;
  message: string;
}

export const K2nException = (kanji: string): returnValue => {
  const { kanjiDigits, kanjiChars, numberDigits, numberChars } =
    KanjiNumbersList();

  //零を含む一文字以上の文字列をなくす
  if (kanji.length > 1 && kanji.indexOf("零") !== -1) {
    return { status: false, message: "零が不正な位置にあります" };
  }

  //kanjiArray以外の文字列（壱、弍、拾など以外の文字列）をなくす、不正な文字の並び（四五など）をなくす
  const kanjiArr = [...kanjiChars, ...kanjiDigits]; //[壱,弐,参..., 拾,百,千...]
  for (let i = 0; i < kanji.length; i++) {
    if (
      kanjiChars.indexOf(kanji[i]) !== -1 &&
      kanjiChars.indexOf(kanji[i + 1]) !== -1
    ) {
      return {
        status: false,
        message: "百四八のように、漢数字が連続して続いています",
      };
    }
    for (let j = 0; j < kanjiArr.length; j++) {
      if (kanji[i] === kanjiArr[j]) {
        break;
      }
      if (j === kanjiArr.length - 1) {
        return { status: false, message: "不正な文字が含まれています" };
      }
    }
  }

  // 兆、億、万の例外をなくす
  const digitOrderArr = [];
  for (let i = 0; i < kanjiDigits.length - 3; i++) {
    //兆、億、万の重複をなくす
    if (kanji.indexOf(kanjiDigits[kanjiDigits.length - 1 - i]) !== -1) {
      digitOrderArr.push(
        kanji.indexOf(kanjiDigits[kanjiDigits.length - 1 - i]),
      );
    }
    if (
      kanji.indexOf(kanjiDigits[kanjiDigits.length - 1 - i]) !==
      kanji.lastIndexOf(kanjiDigits[kanjiDigits.length - 1 - i])
    ) {
      return {
        status: false,
        message: "兆、億、万のいずれかの文字が二つ以上含まれています",
      };
    }
  }

  if (digitOrderArr.length !== 0) {
    //兆、億、万のありえない並びをなくす（五百万兆など）
    for (let i = 0; i < digitOrderArr.length - 1; i++) {
      if (digitOrderArr[i] >= digitOrderArr[i + 1]) {
        return {
          status: false,
          message: "兆、億、万のいずれかの位置が正しくありません",
        };
      }
    }
  }

  //桁ごとにチャンク分けをし、25行目と同じように例外をなくす
  const kanjiChunks = MakeChunks(kanji); // console.log(kanjiChunks)は['四千兆', '五千五百万', '四拾八']のようになる

  for (let i = 0; i < kanjiChunks.length; i++) {
    const digitOrderArr = [];
    for (let j = 0; j < kanjiDigits.length - 3; j++) {
      //拾、百、千の重複をなくす　※"京"などの新しい位が一つ加わった場合、kanjiDigits.length - 4にする
      if (kanjiChunks[i].indexOf(kanjiDigits[j]) !== -1) {
        digitOrderArr.push(kanjiChunks[i].indexOf(kanjiDigits[j]));
      }
      if (
        kanjiChunks[i].indexOf(kanjiDigits[j]) !==
        kanjiChunks[i].lastIndexOf(kanjiDigits[j])
      ) {
        return {
          status: false,
          message: "拾、百、千のいずれかの文字が二つ以上含まれています",
        };
      }
    }
    if (digitOrderArr.length > 1) {
      //拾、百、千のありえない並びをなくす（五百万兆など）
      for (let j = 0; j < digitOrderArr.length - 1; j++) {
        if (digitOrderArr[j] <= digitOrderArr[j + 1]) {
          return {
            status: false,
            message: "拾、百、千のいずれかの位置が正しくありません",
          };
        }
      }
    }
    if (kanjiChunks[i].length === 1) {
      if (kanjiChars.indexOf(kanjiChunks[i]) === -1) {
        return {
          status: false,
          message:
            "兆、億、万のいずれか一文字だけが文字列に紛れ込んでしまっています",
        };
      }
    } else {
      for (let j = 0; j < kanjiChunks[i].length - 1; j++) {
        if (j % 2 === 0) {
          if (kanjiChars.indexOf(kanjiChunks[i][j]) === -1) {
            return {
              status: false,
              message: "壱、弍などの数字が正しくない位置にあります",
            };
          }
        } else {
          if (kanjiDigits.indexOf(kanjiChunks[i][j]) === -1) {
            return {
              status: false,
              message: "兆、億などの位を表す数字が正しくない位置にあります",
            };
          }
        }
      }
    }
  }
  return { status: true, message: "done" };
};
