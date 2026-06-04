// ============================================================
// ENTRY POINT - Sistema de Gestión de Billar
// ============================================================
import "@/styles/main.css";
import { initApp } from "./app";

// Initialize app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
