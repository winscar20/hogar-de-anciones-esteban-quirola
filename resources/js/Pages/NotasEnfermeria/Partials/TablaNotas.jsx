import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import ModalCreateForm from "@/Components/ModalCreateForm";
const TablaNotas = ({ notas, filters }) => {
    const loggedUser = usePage().props.auth.user;
    const searchQuery = filters.search || "";
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nota, setNota] = useState({});

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setNota({});
        setIsModalOpen(false);
    };
    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar esta nota?")) {
            router.delete(route("notas-enfermeria.destroy", id), {
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

    const handleModalOpen = (nota) => {
        setNota(nota);
        openModal();
    };
    return (
        <>
            {isModalOpen && (
                <ModalCreateForm
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={"Agregar Nota a Paciente"}
                    nota={nota}
                ></ModalCreateForm>
            )}
            <div className="container mx-auto px-4 mt-16">
                {notas.data.length > 0 ? (
                    notas.data.map((nota, index) => (
                        <div
                            className="bg-white shadow-xl rounded-xl p-6 mb-4"
                            key={nota.id}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center">
                                    <i className="fa-solid fa-user text-gray-500 mr-2"></i>
                                    <span className="text-gray-700">
                                        Paciente:{" "}
                                        <strong>
                                            {nota.paciente.nombres}{" "}
                                            {nota.paciente.apellidos}
                                        </strong>{" "}
                                        (C.I:
                                        {nota.paciente.cedula})
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <i className="fa-solid fa-calendar text-gray-500 mr-2"></i>
                                    <span className="text-gray-700">
                                        Fecha:{" "}
                                        {format(
                                            new Date(nota.fecha),
                                            "dd/MM/yyyy HH:mm"
                                        )}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <i className="fa-solid fa-user-edit text-gray-500 mr-2"></i>
                                    <span className="text-gray-700">
                                        Creador: {nota.user.name} (
                                        {nota.user.email})
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 border-b-2 pb-4">
                                <h2 className="text-lg font-semibold">Nota:</h2>
                                <p
                                    className="text-gray-600"
                                    dangerouslySetInnerHTML={{
                                        __html: nota.nota,
                                    }}
                                ></p>
                            </div>
                            {(loggedUser.role.name === "Enfermeria" && (
                                <div className="flex justify-end mt-4 space-x-4">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => handleModalOpen(nota)}
                                    >
                                        <i className="fa-solid fa-notes-medical"></i>{" "}
                                        nota a{" "}
                                        {nota.paciente.nombres.split(" ")[0]}{" "}
                                        {nota.paciente.apellidos.split(" ")[0]}
                                    </button>
                                    <span className="text-sm text-gray-300">
                                        |
                                    </span>
                                    <Link
                                        className="text-blue-500 hover:underline"
                                        href={route(
                                            "notas-enfermeria.edit",
                                            nota.id
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
                                        onClick={() => handleDelete(nota.id)}
                                    >
                                        <i className="fa-solid fa-trash"></i>{" "}
                                        Eliminar
                                    </button>
                                </div>
                            )) || (
                                <div className="flex justify-end mt-4 space-x-4 text-gray-400">
                                    Solo personal de enfermería tiene opciones
                                    para editar o agreagar mas notas.
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="bg-white shadow-2xl rounded-xl p-6 mt-16">
                        <div className="flex items-center justify-center">
                            <i className="fa-solid fa-circle-exclamation text-gray-500 mr-2"></i>
                            <span className="text-gray-700">
                                No hay notas por el momento
                            </span>
                        </div>
                    </div>
                )}
            </div>
            <nav
                className="mt-5 flex items-center justify-center text-sm"
                aria-label="Page navigation example"
            >
                {notas.links.map((link, index) => (
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
export default TablaNotas;
