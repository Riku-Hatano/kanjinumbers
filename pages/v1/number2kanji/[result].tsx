import { useRouter } from "next/router";

const Result = () => {
    const router = useRouter();
    const { result } = router.query;
    
    return (
        <>
            <p>{result}</p>
        </>
    )
}

export default Result;