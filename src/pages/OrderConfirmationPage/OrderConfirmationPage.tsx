import { Link, useParams } from "react-router-dom";
import styles from "./OrderConfirmationPage.module.css";
import { useQuery } from "@tanstack/react-query";

export default function OrderConfirmation() {
    const { id } = useParams();

    const { data: order, isLoading, isError } = useQuery({
        queryKey: ["order", id],
        queryFn: () =>
            fetch(`http://localhost:3000/orders/${id}`).then((res) => res.json()),
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading order</p>
    if (!order) return <p>Order not found</p> 

    // ta bort mockOrder när checkout är klar
    const mockOrder = {
        orderId: "ABC123",
        customerName: "Kund Kundsson",
        orderDate: "2026-10-01",
    };
    // ta bort mockOrder när checkout är klar

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Tack för din beställning! {"\u{1F389}"}</h2>
            <p className={styles.text}>
                Din order har registrerats. Vi jobbar för fullt med att packa den!
            </p>
            <div className={styles.infoBox}>
                <p><strong>Ordernummer:</strong> {mockOrder.orderId} </p> {/* ändra mockOrder till rätt data */}
                <p><strong>Namn:</strong> {mockOrder.customerName} </p> {/* ändra mockOrder till rätt data */}
                <p><strong>Orderdatum:</strong> {mockOrder.orderDate} </p> {/* ändra mockOrder till rätt data */}
            </div>

            <Link to="/" className={styles.button}>
                Tillbaka till startsidan {"\u{1F3E0}"}
            </Link>
        </div>
    )
}