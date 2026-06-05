import { debugLog } from "@/utils/debug";

const activeEscHandlers = new Map();
const activeClickHandlers = new Map();

export const modalService = {
  open: (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) {
      debugLog("error", `❌ Modal "${modalId}" no encontrado`);
      return;
    }

    // Close any other open modals first if necessary
    modal.classList.remove("hidden");
    
    // Trigger transition next frame
    requestAnimationFrame(() => {
      modal.classList.add("show");
    });
    
    debugLog("sistema", `🔓 Modal opened: ${modalId}`);

    // ESC Key Closure
    const escHandler = (e) => {
      if (e.key === "Escape") {
        modalService.close(modalId);
      }
    };
    document.addEventListener("keydown", escHandler);
    activeEscHandlers.set(modalId, escHandler);

    // Click outside closure
    const clickHandler = (e) => {
      if (e.target === modal) {
        modalService.close(modalId);
      }
    };
    modal.addEventListener("click", clickHandler);
    activeClickHandlers.set(modalId, clickHandler);
  },

  close: (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove("show");
    
    // Clean up event listeners
    const escHandler = activeEscHandlers.get(modalId);
    if (escHandler) {
      document.removeEventListener("keydown", escHandler);
      activeEscHandlers.delete(modalId);
    }

    const clickHandler = activeClickHandlers.get(modalId);
    if (clickHandler) {
      modal.removeEventListener("click", clickHandler);
      activeClickHandlers.delete(modalId);
    }

    // Wait for transition to finish
    setTimeout(() => {
      if (!modal.classList.contains("show")) {
        modal.classList.add("hidden");
      }
    }, 200);

    debugLog("sistema", `🔒 Modal closed: ${modalId}`);
  }
};

// Global exports for migration convenience
window.openModal = modalService.open;
window.closeModal = modalService.close;
