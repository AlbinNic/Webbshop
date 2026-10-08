import { useNavigate } from "react-router-dom";
import type { CartItem } from "../../types";
import "./kundvagn.css";

interface KundvagnProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export default function Kundvagn({
  items,
  onUpdateQuantity,
  onRemove,
}: KundvagnProps) {
  const navigate = useNavigate();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Din kundvagn</h1>

      {items.length === 0 ? (
        <p className="cart-empty">
          Din kundvagn är tom.
        </p>
      ) : (
        <ul className="cart-list">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="cart-item">
              <img
                src={product.image}
                alt={product.title}
                className="cart-item-image"
              />

              <div className="cart-item-info">
                <p className="cart-item-title">
                  {product.title}
                </p>
                <p className="cart-item-price">
                  {product.price} kr
                </p>
              </div>

              <div className="cart-item-quantity">
                <button
                  type="button"
                  onClick={() =>
                    onUpdateQuantity(product.id, quantity - 1)
                  }
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() =>
                    onUpdateQuantity(product.id, quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <p className="cart-item-subtotal">
                {product.price * quantity} kr
              </p>

              <button
                type="button"
                className="cart-item-remove"
                onClick={() => onRemove(product.id)}
              >
                Ta bort
              </button>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="cart-summary">
          <p className="cart-total">
            Totalt: {totalPrice} kr
          </p>

          <button
            type="button"
            className="cart-checkout-button"
            onClick={() => navigate("/kassa")}
          >
            Till kassan
          </button>
        </div>
      )}
    </div>
  );
}
