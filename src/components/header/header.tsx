import "./header.css";


export function createHeader(): HTMLElement {
    const header = document.createElement("header");
    header.className = "shop-header";


    const searchForm = document.createElement("form");
    searchForm.className = "search-bar";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search products";

    const searchButton = document.createElement("button");
    searchButton.type = "submit";
    searchButton.textContent = "Search";

    searchForm.addEventListener("submit", (e: SubmitEvent) => {
        e.preventDefault();
        console.log("Searching for:", searchInput.value);
    });

    searchForm.append(searchInput, searchButton);


    const nav = document.createElement("nav");
    nav.className = "nav-links";

    const links = [
        { text: "Products", href: "/products" },
        { text: "About", href: "/about" },
        { text: "Contact", href: "/contact" },
    ];

    links.forEach(({ text, href }) => {
        const a = document.createElement("a");
        a.href = href;
        a.textContent = text;
        nav.appendChild(a);
    });


    const cartButton = document.createElement("button");
    cartButton.className = "cart-button";
    cartButton.textContent = "Cart";
    cartButton.addEventListener("click", () => {
        console.log("Cart clicked");
    });

    // Assemble
    header.append(searchForm, nav, cartButton);

    return header;
}