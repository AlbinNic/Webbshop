import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import type { Product } from "../../types.ts";
import styles from "./ProductDetailPage.module.css";

const ProductDetailPage = () => {
    const { id } = useParams();

    const { data: product, isLoading, isError } = useQuery<Product>({
        queryKey: ["product", id],
        queryFn: () =>
            fetch(`http://localhost:3000/products/${id}`).then((res) => res.json()),
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading product</p>
    if (!product) return <p>Product not found</p> 

    return (
        <div className={styles.mainContainer}>
            <div className={styles.product}>
                <ProductCard product={product} />
            </div>

            <div className={styles.info}>
                <p>{product.description}</p>
                <button>detta ska va kundvagn sen</button>
            </div>
        </div>
    )
}

export default ProductDetailPage;