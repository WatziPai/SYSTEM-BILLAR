import { state, guardarDatosGenerico } from "@/services/state";
import { authService } from "@/services/auth.service";
import { COLLECTIONS, DOC_IDS } from "@/utils/constants";
import { debugLog } from "@/utils/debug";
import { toast } from "@/components/toast";
import { confirmDialog } from "@/components/confirm-dialog";

// ======================================================
// ================= USER TABLE ========================
// ======================================================

let _usuarioEditando = null;

export function renderUsuarios() {
  const tbody = document.getElementById("usuariosTable");
  if (!tbody) return;

  if (state.usuarios.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:30px;color:#999;">No hay usuarios registrados</td></tr>';
    return;
  }

  tbody.innerHTML = state.usuarios.map((u) => `
    <tr>
      <td>${u.username}</td>
      <td>${u.nombre}</td>
      <td style="text-align:center;">
        <span class="badge ${u.rol === "admin" ? "badge-success" : "badge-info"}">${u.rol.toUpperCase()}</span>
      </td>
      <td style="text-align:center;">
        <button class="btn-small btn-green" data-action="editar-usuario" data-id="${u.id}" style="margin-right:5px;">✏️</button>
        ${state.usuarioActual?.id !== u.id ? `<button class="btn-small btn-red" data-action="eliminar-usuario" data-id="${u.id}">🗑️</button>` : ""}
      </td>
    </tr>
  `).join("");

  debugLog("sistema", "👥 Tabla de usuarios actualizada", { total: state.usuarios.length });
}

export function togglePanelUsuarios() {
  const panel = document.getElementById("usuariosPanel");
  if (!panel) return;

  if (panel.classList.contains("hidden")) {
    panel.classList.remove("hidden");
    renderUsuarios();
  } else {
    panel.classList.add("hidden");
  }
}

// ======================================================
// ================ MODAL USUARIO ======================
// ======================================================

export function showModalUsuario(usuarioId = null) {
  if ((state.usuarioActual?.rol || "").toLowerCase() !== "admin") return;

  _usuarioEditando = usuarioId !== null
    ? state.usuarios.find((u) => u.id === usuarioId) || null
    : null;

  const modal = document.getElementById("modalUsuario");
  const title = document.getElementById("usuarioModalTitle");

  if (_usuarioEditando) {
    title.textContent = "Editar Usuario";
    document.getElementById("nuevoNombre").value = _usuarioEditando.nombre;
    document.getElementById("nuevoUsername").value = _usuarioEditando.username;
    document.getElementById("nuevoPassword").value = "";
    document.getElementById("nuevoRol").value = _usuarioEditando.rol;
  } else {
    title.textContent = "Agregar Usuario";
    ["nuevoNombre", "nuevoUsername", "nuevoPassword"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
    document.getElementById("nuevoRol").value = "empleado";
  }

  document.getElementById("usuarioError")?.classList.add("hidden");
  modal?.classList.add("show");
}

async function guardarUsuario() {
  const nombre = document.getElementById("nuevoNombre")?.value.trim();
  const username = document.getElementById("nuevoUsername")?.value.trim();
  const password = document.getElementById("nuevoPassword")?.value;
  const rol = document.getElementById("nuevoRol")?.value;
  const errorDiv = document.getElementById("usuarioError");
  const email = `${username}@billar.app`;

  errorDiv?.classList.add("hidden");

  if (!nombre || !username || (!_usuarioEditando && !password)) {
    if (errorDiv) errorDiv.textContent = "Por favor completa todos los campos";
    errorDiv?.classList.remove("hidden");
    return;
  }

  const existente = state.usuarios.find((u) =>
    u.username === username && u.id !== (_usuarioEditando?.id ?? null)
  );
  if (existente) {
    if (errorDiv) errorDiv.textContent = "El nombre de usuario ya existe";
    errorDiv?.classList.remove("hidden");
    return;
  }

  try {
    if (_usuarioEditando) {
      _usuarioEditando.nombre = nombre;
      _usuarioEditando.username = username;
      _usuarioEditando.rol = rol;

      if (password) {
        const currentUser = authService.getCurrentUser();
        if (currentUser && currentUser.uid === _usuarioEditando.uid) {
          await authService.updatePassword(currentUser, password);
          toast.success("✅ Contraseña actualizada correctamente");
        } else {
          if (errorDiv) errorDiv.textContent = "⚠️ Solo puedes cambiar tu propia contraseña desde aquí.";
          errorDiv?.classList.remove("hidden");
          // Still save other fields
        }
      }
    } else {
      const { user } = await authService.createUser(email, password);
      state.usuarios.push({
        id: Date.now(),
        nombre,
        username,
        rol,
        uid: user.uid,
      });
      toast.success("✅ Usuario creado correctamente");
    }

    await guardarDatosGenerico(COLLECTIONS.USUARIOS, DOC_IDS.TODOS, { lista: state.usuarios }, true);
    renderUsuarios();
    document.getElementById("modalUsuario")?.classList.remove("show");
    _usuarioEditando = null;
  } catch (error) {
    console.error("Error guardando usuario:", error);
    if (errorDiv) errorDiv.textContent = "Error al crear usuario: " + error.message;
    errorDiv?.classList.remove("hidden");
  }
}

async function eliminarUsuario(id) {
  if ((state.usuarioActual?.rol || "").toLowerCase() !== "admin") return;
  if (state.usuarioActual?.id === id) { toast.error("No puedes eliminar tu propia cuenta"); return; }

  const ok = await confirmDialog.show("🗑️ Eliminar Usuario", "¿Estás seguro de eliminar este usuario?", { confirmText: "Eliminar", cancelText: "Cancelar", isDestructive: true });
  if (!ok) return;

  state.usuarios = state.usuarios.filter((u) => u.id !== id);
  await guardarDatosGenerico(COLLECTIONS.USUARIOS, DOC_IDS.TODOS, { lista: state.usuarios }, true);
  renderUsuarios();
  toast.success("✅ Usuario eliminado");
}

// ======================================================
// =================== EVENTS ==========================
// ======================================================

export function initUsuariosEvents() {
  document.addEventListener("click", async (e) => {
    const el = e.target.closest("[data-action]");
    const action = el?.dataset.action;
    const id = parseInt(el?.dataset.id);

    switch (action) {
      case "toggle-usuarios":
        togglePanelUsuarios();
        break;
      case "show-modal-usuario":
        showModalUsuario(null);
        break;
      case "editar-usuario":
        showModalUsuario(id);
        break;
      case "eliminar-usuario":
        await eliminarUsuario(id);
        break;
      case "guardar-usuario":
        await guardarUsuario();
        break;
      case "close-modal-usuario":
        document.getElementById("modalUsuario")?.classList.remove("show");
        _usuarioEditando = null;
        break;
    }
  });
}
