import { createHeader } from "./components/header/header";
import { createFooter } from "./components/footer/footer";
import "./app.css";

document.body.prepend(createHeader());
document.body.append(createFooter());

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)