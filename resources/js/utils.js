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

export function obtenerRangoMeses(fecha1, fecha2) {
    const inicio = new Date(fecha1);
    const fin = new Date(fecha2);

    const añoInicio = inicio.getFullYear();
    const añoFin = fin.getFullYear();
    const mesInicio = inicio.toLocaleString("default", { month: "long" });
    const mesFin = fin.toLocaleString("default", { month: "long" });
    if (añoInicio === añoFin) {
        return `${mesInicio} - ${mesFin} del ${añoInicio}`;
    } else {
        return `${mesInicio} ${añoInicio} - ${mesFin} ${añoFin}`;
    }
}

// Calcular edad basado en la fecha de nacimiento
export function calcularEdad(fecha) {
    if (!fecha) return "";
    const hoy = new Date();
    let años = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
        años--;
    }

    return años;
}
