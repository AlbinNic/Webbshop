
import type { CartItem } from "../../types";
import "./kundvagn.css";

interface CartItemListProps {
  items: CartItem[];
  editable?: boolean;
  onUpdateQuantity?: (
    productId: number,
    quantity: number
  ) => void;
  onRemove?: (productId: number) => void;
}

export function CartItemList({
  items,
  editable = false,
  onUpdateQuantity,
  onRemove,
}: CartItemListProps) {
  if (items.length === 0) {
    return (
      <p className="cart-empty">
        Din kundvagn är tom.
      </p>
    );
  }

  return (
    <ul className={`cart-list ${editable ? "" : "cart-list--readonly"}`}>
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
              {product.price} kr/st
            </p>
          </div>

          {editable && onUpdateQuantity ? (
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
                disabled={quantity >= product.stock}
                onClick={() =>
                  onUpdateQuantity(product.id, quantity + 1)
                }
              >
                +
              </button>
            </div>
          ) : (
            <span>Antal: {quantity}</span>
          )}

          <p className="cart-item-subtotal">
            {product.price * quantity} kr
          </p>

          {editable && onRemove && (
            <button
              type="button"
              className="cart-item-remove"
              onClick={() => onRemove(product.id)}
            >
              Ta bort
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
