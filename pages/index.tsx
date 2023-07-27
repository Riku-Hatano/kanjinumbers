import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => { //強制的に"/"をエントリーポイントである"/v1"に移動させる。
    router.push("/v1");
  }, [])
}

export default Home;