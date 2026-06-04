import { modalService } from "./modal";
import { formatCurrency } from "@/utils/format";
import { debugLog } from "@/utils/debug";

class PaymentModalSystem {
  constructor() {
    this.modalId = "modalConfirmacionPago";
    this.total = 0;
    this.resolvePromise = null;
  }

  show(total, detailsText = "Resumen de cobro") {
    this.total = Number(total || 0);
    debugLog("sistema", `💵 Opening Payment Modal for total: S/ ${this.total.toFixed(2)}`);

    return new Promise((resolve) => {
      this.resolvePromise = resolve;

      // Setup DOM fields
      const detailEl = document.getElementById("pagoDetalle");
      const montoEl = document.getElementById("pagoMonto");
      const cashInput = document.getElementById("pagoMixtoEfectivo");
      const yapeInput = document.getElementById("pagoMixtoYape");
      const mixedInputsPanel = document.getElementById("pagoMixtoInputs");
      
      if (detailEl) detailEl.textContent = detailsText;
      if (montoEl) montoEl.textContent = formatCurrency(this.total);
      
      // Reset inputs
      if (cashInput) cashInput.value = "";
      if (yapeInput) yapeInput.value = "";
      if (mixedInputsPanel) mixedInputsPanel.classList.add("hidden");

      // Select default 'Efectivo'
      const defaultRadio = document.querySelector('input[name="metodoPagoConf"][value="Efectivo"]');
      if (defaultRadio) defaultRadio.checked = true;

      // Open the modal
      modalService.open(this.modalId);
      
      // Wire events dynamically
      this.initEvents();
    });
  }

  initEvents() {
    const mixedInputsPanel = document.getElementById("pagoMixtoInputs");
    const cashInput = document.getElementById("pagoMixtoEfectivo");
    const yapeInput = document.getElementById("pagoMixtoYape");
    
    // Toggle mixed payment panel
    const radios = document.querySelectorAll('input[name="metodoPagoConf"]');
    radios.forEach(radio => {
      radio.onchange = () => {
        if (radio.value === "Mixto") {
          mixedInputsPanel.classList.remove("hidden");
          if (cashInput) {
            cashInput.value = "";
            cashInput.focus();
          }
          if (yapeInput) yapeInput.value = this.total.toFixed(2);
        } else {
          mixedInputsPanel.classList.add("hidden");
        }
      };
    });

    // Auto-calculate split
    if (cashInput) {
      cashInput.oninput = () => {
        let cash = parseFloat(cashInput.value) || 0;
        if (cash > this.total) {
          cash = this.total;
          cashInput.value = this.total.toFixed(2);
        } else if (cash < 0) {
          cash = 0;
          cashInput.value = "0.00";
        }
        
        const yape = this.total - cash;
        if (yapeInput) {
          yapeInput.value = yape.toFixed(2);
        }
      };
    }

    // Confirm button
    const confirmBtn = document.getElementById("btnConfirmarPagoFinal");
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        const checkedRadio = document.querySelector('input[name="metodoPagoConf"]:checked');
        const metodo = checkedRadio ? checkedRadio.value : "Efectivo";
        
        let result = {
          metodoPago: metodo,
          monto: this.total,
          montoEfectivo: 0,
          montoYape: 0
        };

        if (metodo === "Efectivo") {
          result.montoEfectivo = this.total;
        } else if (metodo === "Yape") {
          result.montoYape = this.total;
        } else if (metodo === "Mixto") {
          const cashVal = parseFloat(cashInput.value) || 0;
          const yapeVal = this.total - cashVal;
          
          if (cashVal <= 0 || cashVal >= this.total) {
            alert("⚠️ Por favor ingresa un monto de efectivo válido entre 0 y el total.");
            return;
          }

          result.montoEfectivo = cashVal;
          result.montoYape = yapeVal;
        }

        modalService.close(this.modalId);
        if (this.resolvePromise) {
          this.resolvePromise(result);
          this.resolvePromise = null;
        }
      };
    }

    // Cancel / Back button
    const cancelBtn = document.getElementById("btnAtrasPago");
    if (cancelBtn) {
      cancelBtn.onclick = () => {
        modalService.close(this.modalId);
        if (this.resolvePromise) {
          this.resolvePromise(null);
          this.resolvePromise = null;
        }
      };
    }
  }
}

export const paymentModal = new PaymentModalSystem();
window.paymentModal = paymentModal; // Expose globally for backward compatibility
