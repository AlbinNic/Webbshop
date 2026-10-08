import React from 'react';
import type { Product } from '../../types';
import styles from './AddToCartButton.module.css';

interface AddToCartButtonProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, onAddToCart }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <button 
      className={styles.button}
      onClick={handleClick}
    >
      Lägg i kundvagn
    </button>
  );
};
