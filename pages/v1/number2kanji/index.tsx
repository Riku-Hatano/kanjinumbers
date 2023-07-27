import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const initialKanjiNumberValues = {
    value: "",
    flag: "n2k"
}

const Number2Kanji = () => {
    const [kanjiNumberValues, setKanjiNumberValues] = useState(initialKanjiNumberValues);
    const router = useRouter();

    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setKanjiNumberValues({
            ...kanjiNumberValues,
            [e.target.name]: e.target.value
        })
    }
    const submitHandler = (e: SyntheticEvent<HTMLFormElement>): void => {
        e.preventDefault();
        axios.create().post(`../../api/`, kanjiNumberValues)
            .then((res) => {
                if(res.status === 200) {
                    router.push(`/v1/number2kanji/${res.data.message.result}`);
                } else {
                    console.log(res);
                    alert("入力が間違っています");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <>
            <form onSubmit={submitHandler}>
                <span>アラビア数字: </span><input type="text" name="value" placeholder="半角の数字を入力してください" onChange={inputHandler} required/>
                <button>変換する</button>
            </form>
        </>
    )
}

export default Number2Kanji;