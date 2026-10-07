import { Link } from "react-router-dom";
import styles from "./Fallback.module.css";

export function ProductFallback() {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Kunde inte ladda produkten! {"\u{1F61E}"}</h2>
            <p className={styles.text}>Jag försökte verkligen hitta den här produkten. Jag letade överallt, till och med i databasen! Men nej, den existerar inte...</p>
            <Link to="/" className={styles.button}>
                Tillbaka till produktsidan {"\u{1F3E0}"}
            </Link>
        </div>
    )
}