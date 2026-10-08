import CheckoutFlow from "../../components/CheckoutForms/CheckoutFlow";
import styles from "./CheckoutPage.module.css";

export function CheckoutPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Kassa & Utcheckning</h1>
      
      <div className={styles.layoutGrid}>
        <main className={styles.formSection}>
          <CheckoutFlow />
        </main>

        <aside className={styles.summarySection}>
          <div className={styles.summaryBox}>
            <h2 className={styles.summaryTitle}>Din varukorg</h2>
            
            <div className={styles.cartPlaceholder}>
              <p className={styles.infoText}>
                Produkterna i din varukorg visas här i ett låst läge (ej redigerbart).
              </p>
            </div>

            <div className={styles.totalPriceRow}>
              <span>Totalt att betala:</span>
              <strong>0.00 kr</strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
