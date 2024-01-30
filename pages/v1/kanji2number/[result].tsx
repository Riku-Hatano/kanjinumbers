import { useRouter } from "next/router";

const Result = () => {
  const router = useRouter();
  const { result } = router.query;

  return (
    <>
      <h3>変換結果：{result}</h3>
    </>
  );
};

export default Result;
