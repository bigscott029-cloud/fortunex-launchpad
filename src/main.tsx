import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Set theme based on device preference
const setTheme = () => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', isDark);
};

setTheme();

// Listen for changes in color scheme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setTheme);

createRoot(document.getElementById("root")!).render(<App />);
