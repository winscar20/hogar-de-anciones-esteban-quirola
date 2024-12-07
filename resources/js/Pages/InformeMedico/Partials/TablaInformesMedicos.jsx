import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import ModalCreateNotaMedica from "@/Components/ModalCreateNotaMedica";
import { hasPermission } from "@/utils";
const TablaInformesMedicos = ({ informes, filters }) => {
    const loggedUser = usePage().props.auth.user;
    const searchQuery = filters.search || "";
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [informe, setInforme] = useState({});

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setInforme({});
        setIsModalOpen(false);
    };
    const handleDelete = (id) => {
        if (
            confirm("¿Estás seguro de que deseas eliminar este informe médico?")
        ) {
            router.delete(route("informes-medicos.destroy", id), {
                preserveScroll: true,
                onSuccess: () => {
                    if (flash?.success) {
                        toast.success(flash.success, {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                },
                onError: (error) => {
                    toast.error(flash.error, {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                },
            });
        }
    };

    const handlViewInforme = (informe) => {
        console.log(informe);
    };
    return (
        <>
            {isModalOpen && (
                <ModalCreateNotaMedica
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={"Crear Informe Medico"}
                    nota={informe}
                ></ModalCreateNotaMedica>
            )}
            <div className="container mx-auto px-4 mt-16">
                {informes.data.length > 0 ? (
                    informes.data.map((informe, index) => (
                        <div
                            className="bg-white shadow-xl rounded-xl p-6 mb-4"
                            key={informe.id}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center">
                                    <i className="fa-solid fa-user text-gray-500 mr-2"></i>
                                    <span className="text-gray-700">
                                        Residente:{" "}
                                        <strong>
                                            {informe.paciente.nombres}{" "}
                                            {informe.paciente.apellidos}
                                        </strong>{" "}
                                        (C.I:
                                        {informe.paciente.cedula})
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <i className="fa-solid fa-calendar text-gray-500 mr-2"></i>
                                    <span className="text-gray-700">
                                        Fecha:{" "}
                                        {format(
                                            new Date(informe.fecha_inicio),
                                            "dd/MM/yyyy HH:mm"
                                        )}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <i className="fa-solid fa-user-edit text-gray-500 mr-2"></i>
                                    <span className="text-gray-700">
                                        Dr/Dra: {informe.doctor.name} (
                                        {informe.doctor.email})
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 border-b-2 pb-4">
                                <h2 className="text-lg font-semibold">
                                    Conclusión:
                                </h2>
                                <p
                                    className="text-gray-600"
                                    dangerouslySetInnerHTML={{
                                        __html: informe.conclusion,
                                    }}
                                ></p>
                            </div>

                            <div className="mt-4 border-b-2 pb-4">
                                <h2 className="text-lg font-semibold">
                                    Recomendaciones
                                </h2>
                                <p
                                    className="text-gray-600"
                                    dangerouslySetInnerHTML={{
                                        __html: informe.recomendaciones,
                                    }}
                                ></p>
                            </div>
                            {(hasPermission(
                                loggedUser.role.name,
                                "crear_informes_medicos"
                            ) && (
                                <div className="flex justify-end mt-4 space-x-4">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() =>
                                            handlViewInforme(informe)
                                        }
                                    >
                                        <i className="fa-solid fa-eye"></i> Ver
                                    </button>
                                    <span className="text-sm text-gray-300">
                                        |
                                    </span>
                                    <Link
                                        className="text-blue-500 hover:underline"
                                        href={route(
                                            "informes-medicos.edit",
                                            informe.id
                                        )}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>{" "}
                                        Editar
                                    </Link>
                                    <span className="text-sm text-gray-300">
                                        |
                                    </span>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => handleDelete(informe.id)}
                                    >
                                        <i className="fa-solid fa-trash"></i>{" "}
                                        Eliminar
                                    </button>
                                </div>
                            )) || (
                                <div className="flex justify-end mt-4 space-x-4 text-gray-400">
                                    Solo Doctores pueden editar o eliminar los
                                    informes medicos.
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="bg-white shadow-2xl rounded-xl p-6 mt-16">
                        <div className="flex items-center justify-center">
                            <i className="fa-solid fa-circle-exclamation text-gray-500 mr-2"></i>
                            <span className="text-gray-700">
                                No hay informes por el momento!
                            </span>
                        </div>
                    </div>
                )}
            </div>
            <nav
                className="mt-5 flex items-center justify-center text-sm"
                aria-label="Page navigation example"
            >
                {informes.links.map((link, index) => (
                    <span key={index} className="mx-1">
                        {link.url ? (
                            <Link
                                href={`${link.url}&search=${searchQuery}`}
                                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                                    link.active
                                        ? "bg-mainbutton text-white border-mainbutton"
                                        : "bg-white text-mainbutton border-gray-300 hover:bg-gray-100"
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            ></Link>
                        ) : (
                            <span
                                className="px-4 py-2 rounded-lg border bg-gray-100 text-gray-400"
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            ></span>
                        )}
                    </span>
                ))}
            </nav>
        </>
    );
};
export default TablaInformesMedicos;
