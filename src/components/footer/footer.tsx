import "./footer.css";

export function createFooter(): HTMLElement {
    const footer = document.createElement("footer");
    footer.className = "shop-footer";

    // Shop info
    const info = document.createElement("div");
    info.className = "footer-info";
    info.textContent = "webshop.com";


    const linksContainer = document.createElement("div");
    linksContainer.className = "footer-links";

    const links = [
        { text: "Terms of Service", href: "/terms" },
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Shipping & Returns", href: "/shipping" },
        { text: "Contact Us", href: "/contact" },
    ];

    links.forEach(({ text, href }) => {
        const a = document.createElement("a");
        a.href = href;
        a.textContent = text;
        linksContainer.appendChild(a);
    });

 
    const nameContainer = document.createElement("div");
    nameContainer.className = "footer-name";

    const names = [
        { text: "Marcus"},
        { text: "Albin"},
        { text: "Jessica"},
    ];

    names.forEach(({ text }) => {
        const a = document.createElement("a");
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = text;
        nameContainer.appendChild(a);
    });

    // Assemble
    footer.append(info, linksContainer, nameContainer);

    return footer;
}