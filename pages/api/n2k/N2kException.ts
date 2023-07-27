import { KanjiNumbersList } from "../../../uril/kanjiNumbersList"

const { kanjiDigits, kanjiChars, numberChars } = KanjiNumbersList();

interface returnValue {
    status: boolean,
    message: string
}

export const N2kException = (number: number):returnValue  => {
    const stringedNumber = number.toString();
    for(let i = 0 ; i < stringedNumber.length ; i++) {
        if(numberChars.indexOf(parseInt(stringedNumber[i])) === -1) {
            return {status: false, message: "不正な文字が含まれています"};
        }
    }
    if(number < 0 || number > 9999999999999999) {
        return {status: false, message: "入力された数字が大きい、または小さすぎます"};
    }
    if(number.toString()[0] === "0" && number.toString().length > 1) {
        return {status: false, message: "先頭の数字を０にすることはできません"};
    }
    return {status: true, message: "done"}
}