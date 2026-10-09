
import CheckoutFlow from "../../components/CheckoutForms/CheckoutFlow";
import styles from "./CheckoutPage.module.css";
import { useCart } from "../../components/context/Cartcontext";
import { CartItemList } from "../../components/kundvagn/CartItemList";

export function CheckoutPage() {
  const { items, totalPrice } = useCart();

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>
        Kassa & Utcheckning
      </h1>

      <div className={styles.layoutGrid}>
        <section className={styles.formSection}>
          <CheckoutFlow />
        </section>

        <aside className={styles.summarySection}>
          <div className={styles.summaryBox}>
            <h2 className={styles.summaryTitle}>
              Din varukorg
            </h2>

            <CartItemList
              items={items}
              editable={false}
            />

            <div className="checkout-total">
              <h2>Ordersammanfattning</h2>

              <p>Antal produkter: {totalQuantity}</p>

              <h3>
                Att betala: {totalPrice} kr
              </h3>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
