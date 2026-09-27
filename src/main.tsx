import { createHeader } from "./header";
import { createFooter } from "./footer";
import "./app.css";

document.body.prepend(createHeader());
document.body.append(createFooter());