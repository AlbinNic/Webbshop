import { createHeader } from "./components/header/header";
import { createFooter } from "./components/footer/footer";
import "./app.css";

document.body.prepend(createHeader());
document.body.append(createFooter());