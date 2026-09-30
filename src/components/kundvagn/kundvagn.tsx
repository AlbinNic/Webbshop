import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../../types";
import "./kundvagn.css";

interface CartItem {
    product: Product;
    quantity: number;
}

const API_URL = "http://localhost:3000/products";

async function fetchProducts(): Promise<Product[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Kunde inte hämta produkter");
    return res.json();
}

export default function Kundvagn() {
    const navigate = useNavigate();

    const { data: products, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });

    const [items, setItems] = useState<CartItem[]>([]);

    if (products && items.length === 0 && products.length > 0) {
        setItems(products.slice(0, 2).map((product) => ({ product, quantity: 1 })));
    }

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity < 1) {
            removeItem(productId);
            return;
        }
        setItems((prev) =>
            prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
        );
    };

    const removeItem = (productId: number) => {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (isLoading) {
        return (
            <div className="cart-page">
                <h1>Din kundvagn</h1>
                <p>Laddar...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="cart-page">
                <h1>Din kundvagn</h1>
                <p className="cart-error">Kunde inte hämta produkter. Kör json-server på {API_URL}?</p>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Din kundvagn</h1>

            {items.length === 0 ? (
                <p className="cart-empty">Din kundvagn är tom.</p>
            ) : (
                <ul className="cart-list">
                    {items.map(({ product, quantity }) => (
                        <li key={product.id} className="cart-item">
                            <img src={product.image} alt={product.title} className="cart-item-image" />

                            <div className="cart-item-info">
                                <p className="cart-item-title">{product.title}</p>
                                <p className="cart-item-price">{product.price} kr</p>
                            </div>

                            <div className="cart-item-quantity">
                                <button type="button" onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Minska antal">
                                    −
                                </button>
                                <span>{quantity}</span>
                                <button type="button" onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Öka antal">
                                    +
                                </button>
                            </div>

                            <p className="cart-item-subtotal">{product.price * quantity} kr</p>

                            <button type="button" className="cart-item-remove" onClick={() => removeItem(product.id)}>
                                Ta bort
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {items.length > 0 && (
                <div className="cart-summary">
                    <p className="cart-total">Totalt: {totalPrice} kr</p>
                    <button type="button" className="cart-checkout-button" onClick={() => navigate("lägg betalings route här!!!!!")}>
                        Till kassan
                    </button>
                </div>
            )}
        </div>
    );
}