import { authService } from "@/services/auth.service";
import { state, cargarDatosCriticos } from "@/services/state";
import { COLLECTIONS, DOC_IDS, SECURITY } from "@/utils/constants";
import { debugLog } from "@/utils/debug";
import { toast } from "@/components/toast";
import { confirmDialog } from "@/components/confirm-dialog";

// ========== INACTIVITY MONITOR ==========
let timerInactividad = null;

let lastActivityUpdate = 0;

function actualizarTimestampActividad() {
  if (state.usuarioActual) {
    const now = Date.now();
    if (now - lastActivityUpdate > 1000) {
      localStorage.setItem("ultimaActividad", now.toString());
      lastActivityUpdate = now;
    }
  }
}

function verificarInactividad() {
  if (!state.usuarioActual) return;

  const ultimaActividad = parseInt(localStorage.getItem("ultimaActividad") || "0");
  const tiempoInactivo = Date.now() - ultimaActividad;

  debugLog("seguridad", `⏱️ Tiempo inactivo: ${Math.floor(tiempoInactivo / 60000)} minutos`);

  if (tiempoInactivo >= SECURITY.TIEMPO_EXPIRACION) {
    debugLog("seguridad", "⏰ Sesión cerrada por inactividad");
    cerrarSesionPorInactividad();
  }
}

function iniciarMonitoreoInactividad() {
  debugLog("seguridad", "🔐 Iniciando monitoreo de inactividad");
  actualizarTimestampActividad();

  const eventos = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"];
  eventos.forEach((evento) => {
    document.addEventListener(evento, actualizarTimestampActividad, true);
  });

  timerInactividad = setInterval(verificarInactividad, 60000);
}

function detenerMonitoreoInactividad() {
  debugLog("seguridad", "🔓 Deteniendo monitoreo de inactividad");

  if (timerInactividad) {
    clearInterval(timerInactividad);
    timerInactividad = null;
  }

  const eventos = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"];
  eventos.forEach((evento) => {
    document.removeEventListener(evento, actualizarTimestampActividad, true);
  });
}

async function cerrarSesionPorInactividad() {
  state.usuarioActual = null;
  localStorage.removeItem("ultimaActividad");
  detenerMonitoreoInactividad();

  try {
    await authService.signOut();
  } catch (e) {
    console.warn("Error cerrando sesión Firebase:", e);
  }

  mostrarPantallaLogin();
  toast.warning("🔒 Tu sesión se cerró automáticamente por 5 horas de inactividad.");
}

// ========== SCREEN TRANSITIONS ==========
function mostrarPantallaLogin() {
  document.getElementById("loginScreen")?.classList.remove("hidden");
  document.getElementById("mainScreen")?.classList.add("hidden");
}

function mostrarPantallaPrincipal() {
  debugLog("sistema", "🔄 Mostrando pantalla principal...");

  const loginScreen = document.getElementById("loginScreen");
  const mainScreen = document.getElementById("mainScreen");

  if (!loginScreen || !mainScreen) {
    toast.error("Error: Elementos de la interfaz no encontrados. Recarga la página.");
    return;
  }

  loginScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");

  // Update user info in header
  const userName = document.getElementById("userName");
  const userRole = document.getElementById("userRole");
  if (userName) userName.textContent = state.usuarioActual.nombre;
  if (userRole) userRole.textContent = (state.usuarioActual.rol || "").toUpperCase();

  iniciarMonitoreoInactividad();
  aplicarPermisosRol();

  debugLog("sistema", "✅ Pantalla principal mostrada");
}

// ========== ROLE-BASED PERMISSIONS ==========
function aplicarPermisosRol() {
  const rol = (state.usuarioActual?.rol || "").toLowerCase();

  const toggleEl = (id, show) => {
    const el = document.getElementById(id);
    if (el) {
      if (show) el.classList.remove("hidden");
      else el.classList.add("hidden");
    }
  };

  if (rol === "admin") {
    toggleEl("btnUsuarios", true);
    toggleEl("btnAgregarMesa", true);
    toggleEl("btnAgregarMesaConsumo", true);
    toggleEl("btnTabErrores", true);
    toggleEl("btnReportarError", false);
    toggleEl("btnAgregarProducto", true);
    toggleEl("btnTabConsumoDueno", true);
    toggleEl("btnTabDashboard", true);
    toggleEl("btnTabCaja", true);
    toggleEl("btnTabMensual", true);
    toggleEl("btnEliminarVentas", true);
    toggleEl("btnAjusteChica", true);
    toggleEl("btnAjusteLocal", true);
    toggleEl("btnAjusteYape", true);
    toggleEl("btnLimpiarMovimientos", true);
  } else if (rol === "encargado") {
    toggleEl("btnUsuarios", false);
    toggleEl("btnAgregarMesa", false);
    toggleEl("btnAgregarMesaConsumo", false);
    toggleEl("btnTabErrores", false);
    toggleEl("btnReportarError", true);
    toggleEl("btnAgregarProducto", true);
    toggleEl("btnTabConsumoDueno", true);
    toggleEl("btnTabDashboard", false);
    toggleEl("btnTabCaja", true);
    toggleEl("btnTabMensual", false);
    toggleEl("btnEliminarVentas", false);
    toggleEl("btnAjusteChica", false);
    toggleEl("btnAjusteLocal", false);
    toggleEl("btnAjusteYape", false);
    toggleEl("btnLimpiarMovimientos", false);
  } else {
    // empleado
    toggleEl("btnUsuarios", false);
    toggleEl("btnAgregarMesa", false);
    toggleEl("btnAgregarMesaConsumo", false);
    toggleEl("btnTabErrores", false);
    toggleEl("btnReportarError", true);
    toggleEl("btnAgregarProducto", true);
    toggleEl("btnTabConsumoDueno", false);
    toggleEl("btnTabDashboard", false);
    toggleEl("btnTabCaja", false);
    toggleEl("btnTabMensual", false);
    toggleEl("btnEliminarVentas", false);
    toggleEl("btnAjusteChica", false);
    toggleEl("btnAjusteLocal", false);
    toggleEl("btnAjusteYape", false);
    toggleEl("btnLimpiarMovimientos", false);
  }
}

// ========== LOGIN ==========
async function handleLogin() {
  const btnLogin = document.getElementById("btnLogin");
  const username = document.getElementById("loginUsername")?.value.trim();
  const password = document.getElementById("loginPassword")?.value;
  const errorDiv = document.getElementById("loginError");

  if (!username || !password) {
    errorDiv.textContent = "Por favor completa todos los campos";
    errorDiv.classList.remove("hidden");
    return;
  }

  btnLogin.disabled = true;
  btnLogin.textContent = "Iniciando...";

  try {
    let email = username;
    if (!username.includes("@")) {
      email = `${username}@billar.app`;
    }

    debugLog("sistema", "🔐 Intentando login con Firebase Auth", { email });
    await authService.signIn(email, password);

    errorDiv.classList.add("hidden");
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
  } catch (error) {
    console.error("❌ Error en login:", error);

    const mensajes = {
      "auth/user-not-found": "Usuario no existe",
      "auth/wrong-password": "Contraseña incorrecta",
      "auth/invalid-email": "Email inválido",
      "auth/invalid-credential": "Credenciales incorrectas",
      "auth/too-many-requests": "Demasiados intentos. Espera un momento.",
    };

    errorDiv.textContent = mensajes[error.code] || "Error al iniciar sesión. Intenta nuevamente.";
    errorDiv.classList.remove("hidden");
    debugLog("error", "❌ Login fallido", { error: error.code || error.message });
  } finally {
    btnLogin.disabled = false;
    btnLogin.textContent = "Iniciar Sesión";
  }
}

// ========== LOGOUT ==========
async function handleLogout() {
  debugLog("sistema", "👋 Cerrando sesión...", { usuario: state.usuarioActual?.nombre });

  try {
    await authService.signOut();
    debugLog("sistema", "✅ Sesión cerrada en Firebase Auth");
  } catch (error) {
    console.error("❌ Error al cerrar sesión:", error);
  }

  state.usuarioActual = null;
  sessionStorage.removeItem("billar_active_session");
  localStorage.removeItem("ultimaActividad");
  detenerMonitoreoInactividad();

  mostrarPantallaLogin();
  const btnLogin = document.getElementById("btnLogin");
  if (btnLogin) {
    btnLogin.disabled = false;
    btnLogin.textContent = "Iniciar Sesión";
  }
}

// ========== AUTH STATE OBSERVER ==========
export async function initAuth(onLoginSuccess) {
  authService.onAuthChange(async (user) => {
    if (user) {
      debugLog("sistema", "✅ Usuario autenticado detectado", { uid: user.uid });

      const ultimaActividad = parseInt(localStorage.getItem("ultimaActividad") || "0");
      const tiempoInactivo = Date.now() - ultimaActividad;

      if (ultimaActividad > 0 && tiempoInactivo >= SECURITY.TIEMPO_EXPIRACION) {
        debugLog("seguridad", "❌ Sesión expirada por inactividad, cerrando...");
        await authService.signOut();
        localStorage.removeItem("ultimaActividad");
        toast.warning("🔒 Tu sesión expiró por inactividad. Por favor, inicia sesión nuevamente.");
        document.getElementById("loadingOverlay")?.classList.add("hidden");
        return;
      }

      try {
        await cargarDatosCriticos(); // ⚡ Carga Diferida: solo datos críticos (Mesas, Config, Productos)

        const username = user.email.split("@")[0];
        const usuario = state.usuarios.find((u) => u.username === username);

        if (usuario) {
          state.usuarioActual = usuario;
          state.usuarioActual.uid = user.uid;
          localStorage.setItem("ultimaActividad", Date.now().toString());
          mostrarPantallaPrincipal();
          if (typeof onLoginSuccess === "function") onLoginSuccess();
        } else {
          debugLog("error", "❌ Usuario autenticado pero no encontrado en Firestore");
          await authService.signOut();
          toast.error("Error: Tu usuario no está registrado en el sistema. Contacta al administrador.");
        }
      } catch (error) {
        debugLog("error", "❌ Error al cargar datos", error);
        if (error.code === "permission-denied" || error.message?.includes("permissions")) {
          await authService.signOut();
          toast.error("Error de permisos. Por favor, inicia sesión nuevamente.");
        } else {
          toast.error("Error al cargar datos: " + error.message);
        }
      }
    } else {
      debugLog("sistema", "⏳ Sin sesión activa");
    }

    document.getElementById("loadingOverlay")?.classList.add("hidden");
  });
}

// ========== KEYBOARD SHORTCUTS ==========
export function initKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const loginScreen = document.getElementById("loginScreen");
      if (loginScreen && !loginScreen.classList.contains("hidden")) {
        e.preventDefault();
        handleLogin();
        return;
      }

      const activeModal = document.querySelector(".modal.show");
      if (activeModal) {
        const primaryBtn = activeModal.querySelector(".btn-green, .btn-primary, .btn-blue");
        if (primaryBtn && !primaryBtn.disabled) {
          e.preventDefault();
          primaryBtn.click();
        }
      }
    }

    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal.show");
      if (activeModal) {
        e.preventDefault();
        const closeBtn = activeModal.querySelector(".close-btn, .btn-gray");
        if (closeBtn) closeBtn.click();
      }
    }
  });
}

// ========== PUBLIC API via Event Delegation ==========
export function initAuthEvents() {
  document.addEventListener("click", (e) => {
    if (e.target.id === "btnLogin" || e.target.closest("#btnLogin")) {
      handleLogin();
    }
    if (e.target.id === "btnLogout" || e.target.closest("#btnLogout")) {
      handleLogout();
    }
  });
  
  // Enter key on password field
  document.getElementById("loginPassword")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleLogin();
  });
}

export { mostrarPantallaPrincipal, aplicarPermisosRol, handleLogin, handleLogout };
