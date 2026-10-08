import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import type { Product } from "../../types.ts";
import styles from "./ProductDetailPage.module.css";
import { AddToCartButton } from "../../components/AddToCartButton/AddToCartButton.tsx";

const ProductDetailPage = () => {
    const { id } = useParams();

    const handleAddToCart = (product: Product) => {
        alert(`${product.title} lades i korgen!`);
    };

    const { data: product, isLoading, isError } = useQuery<Product>({
        queryKey: ["product", id],
        queryFn: () =>
            fetch(`http://localhost:3000/products/${id}`).then((res) => res.json()),
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading product</p>
    if (!product || product.error) {
        throw new Error("Product not found");
    } 

    return (
        <div className={styles.mainContainer}>
            <div className={styles.product}>
                <ProductCard product={product} />
            </div>

            <div className={styles.info}>
                <p>{product.description}</p>
                <AddToCartButton 
                    product={product}
                    onAddToCart={handleAddToCart}
                />
            </div>
        </div>
    )
}

export default ProductDetailPage;