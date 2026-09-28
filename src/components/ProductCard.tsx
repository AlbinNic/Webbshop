import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'detailed';            
  showDescription?: boolean;                
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'grid',
  showDescription = false,
  onAddToCart,
}) => {
  const { title, price, image, description, sale } = product;

  const cardClass = variant === 'detailed' 
    ? 'product-card product-card--detailed' 
    : 'product-card product-card--grid';

  return (
    <article className={cardClass}>
      {sale && <span className="product-card__badge-sale">REA</span>}
      
      <div className="product-card__image-container">
        <img src={image} alt={title} className="product-card__image" />
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{title}</h3>
        
        {showDescription && (
          <p className="product-card__description">{description}</p>
        )}
        
        <p className="product-card__price">{price} kr</p>

        {onAddToCart && (
          <button 
            className="product-card__button"
            onClick={() => onAddToCart(product)}
          >
            Lägg i kundvagn
          </button>
        )}
      </div>
    </article>
  );
};
