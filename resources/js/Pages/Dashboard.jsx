import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

export default function Dashboard({ stats = {} }) {
    console.log(stats);
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
                            {/* Total de Residentes */}
                            <Link href={route("residentes.index")}>
                                <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Total de Residentes
                                    </h3>
                                    <p className="mt-2 text-3xl font-semibold text-gray-600 text-center">
                                        {stats.total_pacientes}
                                    </p>
                                </div>
                            </Link>

                            {/* Total de Usuarios */}
                            <Link href={route("users.index")}>
                                <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Total de Usuarios
                                    </h3>
                                    <p className="mt-2 text-3xl font-semibold text-gray-600 text-center">
                                        {stats.total_usuarios}
                                    </p>
                                </div>
                            </Link>

                            {/* Total de Informes Médicos */}
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

                            {/* Total de Informes de Enfermería */}
                            <Link href={route("notas-enfermeria.index")}>
                                <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Notas de Enfermería
                                    </h3>
                                    <p className="mt-2 text-3xl font-semibold text-gray-600 text-center">
                                        {stats.total_notas_enfermeria}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
