const rolePermissions = {
    SuperAdmin: [
        "crear_residentes",
        "editar_residentes",
        "eliminar_residentes",
        "ver_residentes",
        "crear_usuarios",
        "editar_usuarios",
        "eliminar_usuarios",
        "ver_usuarios",
    ],
    Administrativo: [
        "crear_residentes",
        "editar_residentes",
        "eliminar_residentes",
        "ver_residentes",
        "crear_usuarios",
        "editar_usuarios",
        "eliminar_usuarios",
        "ver_usuarios",
    ],
    Doctor: ["ver_residentes"],
    Enfermeria: ["ver_residentes", "crear_notas_enfermeria"],
    Externo: ["ver_residentes"],
};

// Función para verificar permisos
export function hasPermission(role, action) {
    if (!rolePermissions[role]) {
        console.warn(`El rol ${role} no está definido en los permisos.`);
        return false;
    }
    return rolePermissions[role].includes(action);
}