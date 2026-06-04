import { debugLog } from "@/utils/debug";

class ConfirmDialogSystem {
  constructor() {
    this.dialogEl = null;
  }

  show(title, message, options = {}) {
    const {
      confirmText = "Aceptar",
      cancelText = "Cancelar",
      isDestructive = false
    } = options;

    return new Promise((resolve) => {
      // Remove any existing dialog first
      this.close();

      this.dialogEl = document.createElement("div");
      this.dialogEl.className = "confirm-overlay";

      const confirmBtnClass = isDestructive ? "btn-red" : "btn-green";

      this.dialogEl.innerHTML = `
        <div class="confirm-card">
          <div class="confirm-header ${isDestructive ? 'destructive' : ''}">
            <h3>${title}</h3>
          </div>
          <div class="confirm-body">
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <div class="confirm-footer">
            <button id="confirmCancelBtn" class="btn btn-gray">${cancelText}</button>
            <button id="confirmOkBtn" class="btn ${confirmBtnClass}">${confirmText}</button>
          </div>
        </div>
      `;

      document.body.appendChild(this.dialogEl);
      debugLog("sistema", `💬 Confirm Dialog Shown: "${title}"`);

      // Trigger animation
      requestAnimationFrame(() => {
        this.dialogEl.classList.add("confirm-overlay-show");
        this.dialogEl.querySelector(".confirm-card").classList.add("confirm-card-show");
      });

      const cancelBtn = this.dialogEl.querySelector("#confirmCancelBtn");
      const okBtn = this.dialogEl.querySelector("#confirmOkBtn");

      const handleResponse = (value) => {
        resolve(value);
        this.close();
      };

      cancelBtn.addEventListener("click", () => handleResponse(false));
      okBtn.addEventListener("click", () => handleResponse(true));

      // Close on escape
      const escapeHandler = (e) => {
        if (e.key === "Escape") {
          document.removeEventListener("keydown", escapeHandler);
          handleResponse(false);
        }
      };
      document.addEventListener("keydown", escapeHandler);
    });
  }

  close() {
    if (this.dialogEl && this.dialogEl.parentNode) {
      const card = this.dialogEl.querySelector(".confirm-card");
      if (card) card.classList.remove("confirm-card-show");
      this.dialogEl.classList.remove("confirm-overlay-show");
      
      const el = this.dialogEl;
      this.dialogEl = null;

      // Allow fade-out animation to complete
      setTimeout(() => {
        if (el.parentNode) el.remove();
      }, 250);
    }
  }
}

export const confirmDialog = new ConfirmDialogSystem();
window.confirmDialog = confirmDialog; // Expose globally for easier migration
