import { Link } from "react-router-dom";
import styles from "./Fallback.module.css";

export function NotFoundFallback() {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Stopp! {"\u26D4"}</h2>
            <p className={styles.text}>Du verkar ha hamnat lite tokigt, men var inte rädd, vi har bokat om din resa! Här är din biljett {"\u{1F3AB}"}, nu åker vi hemåt.</p>
            <Link to="/" className={styles.button}>
                Åk tillbaka {"\u{1F684}"}
            </Link>
        </div>
    )
}