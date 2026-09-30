import { useState } from "react";
import type { FormEvent } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";

interface NavLink {
    text: string;
    href: string;
}

const links: NavLink[] = [
    { text: "Produkter", href: "/products" },
    { text: "Om oss", href: "/about" },
    { text: "Kontakt", href: "/contact" },
];

export function Header() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Searching for:", query);
    };

    return (
        <header className="shop-header">
            <Link to="/" className="home-button">
                webbshop
            </Link>

            <form className="search-bar" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Sök produkter..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Sök</button>
            </form>

            <nav className="nav-links">
                {links.map(({ text, href }) => (
                    <a key={href} href={href}>
                        {text}
                    </a>
                ))}
            </nav>

            <button className="cart-button" onClick={() => navigate("/cart")}>
                Kundvagn
            </button>
        </header>
    );
}