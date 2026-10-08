export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    categories: string[];
    sale: boolean;
    image: string;
    stock: number;
    error?: string;
}

export interface Category {
  id: string;
  title: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}
