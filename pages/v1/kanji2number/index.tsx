import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../../styles/pages/kanji2number.module.css";

const initialKanjiNumberValues = {
  value: "",
  flag: "k2n",
};

const Kanji2Number = () => {
  const [kanjiNumberValues, setKanjiNumberValues] = useState(
    initialKanjiNumberValues,
  );
  const router = useRouter();

  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setKanjiNumberValues({
      ...kanjiNumberValues,
      [e.target.name]: e.target.value,
    });
  };

  const clickHandler = (e: any) => {
    setKanjiNumberValues({
      ...kanjiNumberValues,
      value: kanjiNumberValues.value + e.target.innerHTML,
    });
  };

  const deleteHandler = () => {
    const nweValue = kanjiNumberValues.value.slice(
      0,
      kanjiNumberValues.value.length - 1,
    );
    setKanjiNumberValues({
      ...kanjiNumberValues,
      value: nweValue,
    });
  };

  const deleteAll = () => {
    setKanjiNumberValues({
      ...kanjiNumberValues,
      value: "",
    });
  };

  const submitHandler = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios
      .create()
      .post(`../../api/`, kanjiNumberValues)
      .then((res) => {
        if (res.status === 200) {
          router.push(`/v1/kanji2number/${res.data.message.result}`);
        } else {
          console.log(res);
          alert("入力が間違っています");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.main}>
      <form onSubmit={submitHandler}>
        <span>大字表記の漢数字: </span>
        <input
          type="text"
          name="value"
          placeholder="壱や弍などの大字表記の漢数字を入力してください"
          onChange={inputHandler}
          value={kanjiNumberValues.value}
          required
        />
        <button>変換する</button>
      </form>
      <div className={styles.buttons}>
        <div>
          <div onClick={clickHandler}>拾</div>
          <div onClick={clickHandler}>百</div>
          <div onClick={clickHandler}>千</div>
        </div>
        <div>
          <div onClick={clickHandler}>万</div>
          <div onClick={clickHandler}>億</div>
          <div onClick={clickHandler}>兆</div>
        </div>
        <div>
          <div onClick={clickHandler}>七</div>
          <div onClick={clickHandler}>八</div>
          <div onClick={clickHandler}>九</div>
        </div>
        <div>
          <div onClick={clickHandler}>四</div>
          <div onClick={clickHandler}>五</div>
          <div onClick={clickHandler}>六</div>
        </div>
        <div>
          <div onClick={clickHandler}>壱</div>
          <div onClick={clickHandler}>弍</div>
          <div onClick={clickHandler}>参</div>
        </div>
        <div>
          <div onClick={clickHandler}>零</div>
          <div onClick={deleteHandler}>一文字消す</div>
          <div onClick={deleteAll}>クリア</div>
        </div>
      </div>
    </div>
  );
};

export default Kanji2Number;
