import { N2kException } from "./N2kException";
import { ChunkConverter } from "./util/ChunkConverter";
import { KanjiNumbersList } from "../../../uril/kanjiNumbersList";
import { returnValue } from "../../../types/returnValue";

const { kanjiDigits } = KanjiNumbersList();

export const N2k = (number: number): returnValue => {
    let returnString = "";
    if(N2kException(number).status) {
        const numberStr = number.toString();
        const numChunks = [];
        
        for(let i = 0 ; i < Math.ceil(numberStr.length / 4) ; i++) {
            if(numberStr.length - (i + 1) * 4 < 0) {
                numChunks.unshift(numberStr.slice(0, numberStr.length - i * 4))
            } else {
                numChunks.unshift(numberStr.slice(numberStr.length - (i + 1) * 4, numberStr.length - i * 4))
            }
        }

        for(let i = 0 ; i < numChunks.length ; i++) {
            if(i === numChunks.length - 1 && numChunks[i] !== "0000") {
                returnString += ChunkConverter(numChunks[i]);
            } else if(numChunks[i] !== "0000") {
                returnString += ChunkConverter(numChunks[i]);
                returnString += kanjiDigits[numChunks.length + 1 - i];
            }
        }
        
        return {
            status: true,
            statusCode: 200,
            result: returnString
        }
    } else {
        return {
            status: false,
            statusCode: 500,
            result: N2kException(number).message
        }
    }
}