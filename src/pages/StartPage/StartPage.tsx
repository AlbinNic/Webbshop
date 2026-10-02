import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom'; 
import { ProductCard } from '../../components/ProductCard/ProductCard';
import styles from './StartPage.module.css';
import type { Product } from '../../types'; 

const fetchProducts = async (): Promise<Product[]> => { 
  const response = await fetch('http://localhost:3000/products');
  if (!response.ok) {
    throw new Error('Kunde inte hämta produkter');
  }
  return response.json();
};

export const StartPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Alla');

  const { data: allProducts = [], isLoading, isError, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const categories = ['Alla', 'C1', 'C2', 'C3', 'C4', 'C5'];

  const displayedProducts = activeCategory === 'Alla'
    ? allProducts
    : allProducts.filter((p: Product) => p.categories.includes(activeCategory));

  const handleAddToCart = (product: Product) => {
    alert(`${product.title} lades i korgen!`);
  };

  if (isLoading) return <div className={styles.mainContainer}>Laddar produkter...</div>;
  if (isError) return <div className={styles.mainContainer}>Ett fel uppstod: {(error as Error).message}</div>;

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
        {displayedProducts.map((product: Product) => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`} 
            style={{ 
              display: 'block',
              textDecoration: 'none', 
              color: 'inherit' 
            }}
          >
            <ProductCard
              product={product}
              variant="grid"
              onAddToCart={handleAddToCart}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};