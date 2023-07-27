import Link from "next/link";

const Layout = ({ children }: any) => {
    return (
        <>
            <ul>
                <li><Link href="/v1/kanji2number">kanji2number</Link></li>
                <li><Link href="/v1/number2kanji">number2kanji</Link></li>
                <li><Link href="/v1">home</Link></li>
            </ul>
            <div>
                { children }
            </div>
        </>
    )
}

export default Layout;