interface returnValue {
    status: boolean,
    message: string
}

export const N2kException = (number: number):returnValue  => {
    if(number < 0 || number > 9999999999999999) {
        return {status: false, message: "入力された数字が大きい、または小さすぎます"};
    }
    if(number.toString()[0] === "0") {
        return {status: false, message: "先頭の数字を０にすることはできません"};
    }
    return {status: true, message: "done"}
}