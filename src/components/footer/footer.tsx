import "./footer.css";

interface FooterLink {
    text: string;
    href: string;
}

const links: FooterLink[] = [
    { text: "Terms of Service", href: "/terms" },
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Shipping & Returns", href: "/shipping" },
    { text: "Contact Us", href: "/contact" },
];

const names: string[] = ["Marcus", "Albin", "Jessica"];

export function Footer() {
    return (
        <footer className="shop-footer">
            <div className="footer-info">webshop.com</div>

            <div className="footer-links">
                {links.map(({ text, href }) => (
                    <a key={href} href={href}>
                        {text}
                    </a>
                ))}
            </div>

            <div className="footer-name">
                {names.map((name) => (
                    <a key={name} target="_blank" rel="noopener noreferrer">
                        {name}
                    </a>
                ))}
            </div>
        </footer>
    );
}