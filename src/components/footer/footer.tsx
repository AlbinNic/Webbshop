import "./footer.css";



const names: string[] = ["Marcus", "Albin", "Jessica"];

export function Footer() {
    return (
        <footer className="shop-footer">
            <div className="footer-info">webshop.com</div>



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