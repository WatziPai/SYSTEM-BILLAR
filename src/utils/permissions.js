export const ROLES = {
  ADMIN: "admin",
  ENCARGADO: "encargado",
  EMPLEADO: "empleado",
};

export function getRolePermissions(role) {
  const normalizedRole = (role || "").toLowerCase();

  return {
    canManageUsers: normalizedRole === ROLES.ADMIN,
    canManageMesasLayout: normalizedRole === ROLES.ADMIN,
    canReportErrors: normalizedRole !== ROLES.ADMIN, // employees and managers report errors
    canViewTabErrores: normalizedRole === ROLES.ADMIN,
    canManageProducts: normalizedRole === ROLES.ADMIN || normalizedRole === ROLES.ENCARGADO || normalizedRole === ROLES.EMPLEADO, // everyone can see/manage products in this system
    canViewTabConsumoDueno: normalizedRole === ROLES.ADMIN || normalizedRole === ROLES.ENCARGADO,
    canViewTabDashboard: normalizedRole === ROLES.ADMIN,
    canViewTabCaja: normalizedRole === ROLES.ADMIN || normalizedRole === ROLES.ENCARGADO,
    canViewTabMensual: normalizedRole === ROLES.ADMIN,
    canDeleteVentas: normalizedRole === ROLES.ADMIN,
    canAdjustCajaSaldos: normalizedRole === ROLES.ADMIN,
    canClearCajaHistory: normalizedRole === ROLES.ADMIN,
  };
}

export function hasPermission(user, permissionKey) {
  if (!user || !user.rol) return false;
  const permissions = getRolePermissions(user.rol);
  return !!permissions[permissionKey];
}
