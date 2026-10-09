
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../../types";
import { CartItemList } from "./CartItemList";
import "./kundvagn.css";

interface KundvagnProps {
  items: CartItem[];
  onUpdateQuantity: (
    productId: number,
    quantity: number
  ) => void;
  onRemove: (productId: number) => void;
}

export default function Kundvagn({
  items,
  onUpdateQuantity,
  onRemove,
}: KundvagnProps) {
  const navigate = useNavigate();

  const totalPrice = items.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Din kundvagn</h1>

      <CartItemList
        items={items}
        editable={true}
        onUpdateQuantity={onUpdateQuantity}
        onRemove={onRemove}
      />

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
            Gå till kassan
          </button>
        </div>
      )}
    </div>
  );
}
