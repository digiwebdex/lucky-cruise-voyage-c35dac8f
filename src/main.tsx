import { createRoot } from "react-dom/client";
import { initFromApi } from "./services/apiSync";
import App from "./App.tsx";
import "./index.css";

// Initialize API data before rendering (non-blocking for preview mode)
initFromApi().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
