import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { obtenerRangoMeses } from "@/utils";
import FormTitleHeader from "@/Components/FormTitleHeader";

export default function DashboardExterno({ pacientes = [{}] }) {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <h2 className=" mt-4 ml-6 uppercase font-bold text-center text-green-600">
                            Bienvenido a la Fundación Esteban Quirola Casa Hogar
                        </h2>
                        <h3 className=" mt-12 ml-8 font-bold  text-center">
                            Mis Residentes
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
                            {pacientes.length > 0 ? (
                                pacientes.map((paciente) => (
                                    <div
                                        className="bg-gray-100 p-6 rounded-lg shadow-md"
                                        key={paciente.id + "pcte"}
                                    >
                                        <h3 className="text-lg font-medium text-gray-900 text-center">
                                            {paciente.nombres}{" "}
                                            {paciente.apellidos}
                                        </h3>
                                        <div className="mt-4 text-sm  text-gray-600 ">
                                            <div className="font-bold">
                                                Informes Médicos
                                            </div>
                                            <hr className="mb-2" />
                                            {paciente.informes_medicos.length >
                                            0 ? (
                                                paciente.informes_medicos.map(
                                                    (informe) => (
                                                        <Link
                                                            key={
                                                                informe.id +
                                                                "informe"
                                                            }
                                                            href={route(
                                                                "informes-medicos.show",
                                                                informe.id
                                                            )}
                                                            className="text-blue-500 uppercase"
                                                        >
                                                            <div>
                                                                {obtenerRangoMeses(
                                                                    format(
                                                                        new Date(
                                                                            informe.fecha_inicio
                                                                        ),
                                                                        "yyyy-MM-dd"
                                                                    ),
                                                                    format(
                                                                        new Date(
                                                                            informe.fecha_fin
                                                                        ),
                                                                        "yyyy-MM-dd"
                                                                    )
                                                                )}
                                                            </div>
                                                        </Link>
                                                    )
                                                )
                                            ) : (
                                                <p>No tiene informes médicos</p>
                                            )}
                                        </div>
                                        <div className="mt-4 text-sm  text-gray-600 ">
                                            <div className="font-bold">
                                                Notas de Enfermería
                                            </div>
                                            <hr className="mb-2" />
                                            {paciente.notas_enfermeria.length >
                                            0 ? (
                                                <Link
                                                    href={route(
                                                        "notas-enfermeria.index",
                                                        {
                                                            search: paciente.cedula,
                                                        }
                                                    )}
                                                    className="text-blue-500 uppercase"
                                                >
                                                    <div>Ver Notas</div>
                                                </Link>
                                            ) : (
                                                <p>No tiene informes médicos</p>
                                            )}
                                        </div>

                                        <div className="mt-4 text-sm  text-gray-600 ">
                                            <div className="font-bold">
                                                Notas Médicas
                                            </div>
                                            <hr className="mb-2" />
                                            {paciente.notas_medicas.length >
                                            0 ? (
                                                <Link
                                                    href={route(
                                                        "notas-medicas.index",
                                                        {
                                                            search: paciente.cedula,
                                                        }
                                                    )}
                                                    className="text-blue-500 uppercase"
                                                >
                                                    <div>Ver Notas Médicas</div>
                                                </Link>
                                            ) : (
                                                <p>No tiene informes médicos</p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        No tiene ningun Residente a Cargo.
                                    </h3>
                                </div>
                            )}

                            {/* <Link href={route("users.index")}>
                                <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Total de Usuarios
                                    </h3>
                                    <p className="mt-2 text-3xl font-semibold text-gray-600 text-center">
                                        {stats.total_usuarios}
                                    </p>
                                </div>
                            </Link>

                            
                            <Link href={route("informes-medicos.index")}>
                                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-medium text-gray-900 text-center">
                                        Informes Medicos
                                    </h3>
                                    <p className="mt-2 text-3xl font-semibold text-gray-600 text-center">
                                        {stats.total_informes}
                                    </p>
                                </div>
                            </Link>

                            
                            <Link href={route("notas-enfermeria.index")}>
                                <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Notas de Enfermería
                                    </h3>
                                    <p className="mt-2 text-3xl font-semibold text-gray-600 text-center">
                                        {stats.total_notas_enfermeria}
                                    </p>
                                </div>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
