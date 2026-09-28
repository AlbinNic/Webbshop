import { useState } from "react";
import type { FormEvent } from "react";
import "./header.css";

interface NavLink {
    text: string;
    href: string;
}

const links: NavLink[] = [
    { text: "Products", href: "/products" },
    { text: "About", href: "/about" },
    { text: "Contact", href: "/contact" },
];

export function Header() {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Searching for:", query);
    };

    return (
        <header className="shop-header">
            <form className="search-bar" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search products"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <nav className="nav-links">
                {links.map(({ text, href }) => (
                    <a key={href} href={href}>
                        {text}
                    </a>
                ))}
            </nav>

            <button className="cart-button" onClick={() => console.log("Cart clicked")}>
                Cart
            </button>
        </header>
    );
}