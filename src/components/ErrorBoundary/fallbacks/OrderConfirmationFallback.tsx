import { Link } from "react-router-dom";
import styles from "./Fallback.module.css";

export function OrderConfirmationFallback() {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Hoppsan! {"\u{1F4A5}"}</h2>
            <p className={styles.text}>Något gick snett när vi försökte hämta din order. Den kanske inte skapades korrekt, eller så tappade vi kontakten med servern. </p>
            <Link to="/" className={styles.button}> {/* Byt link till kundvagn (eller utcheck???) när denna finns */}
                Tillbaka till kundvagnen {"\u{1F6D2}"}
            </Link>
        </div>
    )
}

// ta bort mockOrdern för att kunna testa