import { debugLog } from "@/utils/debug";

class ToastSystem {
  constructor() {
    this.container = null;
    this.initContainer();
  }

  initContainer() {
    if (this.container) return;
    
    this.container = document.createElement("div");
    this.container.id = "toastContainer";
    this.container.className = "toast-container";
    document.body.appendChild(this.container);
  }

  show(type, message, duration = 3500) {
    this.initContainer();

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    const icons = {
      success: "✅",
      error: "❌",
      warning: "⚠️",
      info: "ℹ️"
    };

    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || ""}</span>
      <span class="toast-message">${message}</span>
      <span class="toast-close">&times;</span>
    `;

    this.container.appendChild(toast);
    debugLog("sistema", `🔔 Toast ${type.toUpperCase()}: ${message}`);

    // Trigger entrance animation on next frame
    requestAnimationFrame(() => {
      toast.classList.add("toast-show");
    });

    const closeBtn = toast.querySelector(".toast-close");
    
    const dismiss = () => {
      toast.classList.remove("toast-show");
      toast.classList.add("out");
      
      toast.addEventListener("animationend", () => {
        toast.remove();
      });
    };

    closeBtn.addEventListener("click", dismiss);

    // Auto-dismiss
    setTimeout(() => {
      if (toast.parentNode) {
        dismiss();
      }
    }, duration);
  }

  success(message, duration) {
    this.show("success", message, duration);
  }

  error(message, duration) {
    this.show("error", message, duration);
  }

  warning(message, duration) {
    this.show("warning", message, duration);
  }

  info(message, duration) {
    this.show("info", message, duration);
  }
}

export const toast = new ToastSystem();
window.toast = toast; // expose globally for backward-compatible/easy migration
