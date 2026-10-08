import React, { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './StartPage.module.css';
import type { Product } from '../../types';

import rawData from '../../../db.json';

interface StartPageProps {
  onAddToCart: (product: Product) => void;
}

export const StartPage: React.FC<StartPageProps> = ({ onAddToCart }) => {
  const allProducts = rawData.products;

  const [activeCategory, setActiveCategory] = useState<string>('Alla');

  const categories = ['Alla', 'C1', 'C2', 'C3', 'C4', 'C5'];

  const displayedProducts = activeCategory === 'Alla'
    ? allProducts
    : allProducts.filter(p => p.categories.includes(activeCategory));

  return (
    <div className={styles.mainContainer}>
      <h2>Vårt utbud</h2>

      <div className={styles.filterRow}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={activeCategory === cat ? styles.filterBtnActive : styles.filterBtn}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'Alla' ? 'Visa alla' : cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="grid"
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};