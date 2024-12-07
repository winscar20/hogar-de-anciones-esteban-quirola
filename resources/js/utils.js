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
    Doctor: [
        "ver_residentes",
        "crear_notas_medicas",
        "editar_notas_medicas",
        "eliminar_notas_medicas",
        "ver_notas_medicas",
        "ver_informes_medicos",
        "crear_informes_medicos",
        "editar_informes_medicos",
        "eliminar_informes_medicos",
    ],
    Enfermeria: [
        "ver_residentes",
        "crear_notas_enfermeria",
        "editar_notas_enfermeria",
        "eliminar_notas_enfermeria",
    ],
    Externo: ["ver_residentes"],
};

export function hasPermission(role, action) {
    if (!rolePermissions[role]) {
        console.warn(`El rol ${role} no está definido en los permisos.`);
        return false;
    }
    return rolePermissions[role].includes(action);
}
