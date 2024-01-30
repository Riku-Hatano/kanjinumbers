import Link from "next/link";
import styles from "../styles/components/layout.module.css";

const Layout = ({ children }: any) => {
  return (
    <div className={styles.layout}>
      <ul className={styles.ul}>
        <li>
          <Link href="/v1/kanji2number">kanji2number</Link>
        </li>
        <li>
          <Link href="/v1/number2kanji">number2kanji</Link>
        </li>
        <li>
          <Link href="/v1">home</Link>
        </li>
      </ul>
      <div className={styles.div}>{children}</div>
    </div>
  );
};

export default Layout;
