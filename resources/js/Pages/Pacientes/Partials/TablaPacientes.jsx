import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { toast } from "react-toastify";
import ModalCreateForm from "@/Components/ModalCreateForm";

const TablaPacientes = ({ pacientes, filters }) => {
    const loggedUser = usePage().props.auth.user;
    const searchQuery = filters.search || "";
    const { flash } = usePage().props;
    const userLogged = usePage().props.auth.user;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nota, setNota] = useState({});

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setNota({});
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            router.delete(route("pacientes.destroy", id), {
                preserveScroll: true, // Mantener el scroll actual después de la eliminación
                onSuccess: () => {
                    if (flash?.success) {
                        toast.success(flash.success, {
                            position: "bottom-right",
                            autoClose: 3000, // Cierra el toast después de 3 segundos
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
                        autoClose: 3000, // Cierra el toast después de 3 segundos
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

    const handleModalOpen = (paciente) => {
        setNota({
            paciente,
        });
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
            <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600">
                    <tr>
                        <th scope="col" className="px-6 py-4">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-4">
                            NOMBRES
                        </th>
                        <th scope="col" className="px-6 py-4">
                            APELLIDOS
                        </th>
                        <th scope="col" className="px-6 py-4">
                            CEDULA
                        </th>
                        <th scope="col" className="px-6 py-4">
                            RESPONSABLE
                        </th>
                        <th>ACCION</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.data.length > 0 ? (
                        pacientes.data.map((paciente) => (
                            <tr
                                className="border-b hover:bg-neutral-50 "
                                key={paciente.id}
                            >
                                <th scope="row" className="px-6 py-4">
                                    PCT0{paciente.id}
                                </th>
                                <td className="px-6 py-4">
                                    {paciente.nombres}
                                </td>
                                <td className="px-6 py-4">
                                    {paciente.apellidos}
                                </td>
                                <td className="px-6 py-4">{paciente.cedula}</td>
                                <td className="px-6 py-4">
                                    {paciente.responsable.name}
                                </td>

                                <td className="px-6 py-4">
                                    <Link
                                        href={route(
                                            "pacientes.edit",
                                            paciente.id
                                        )}
                                        className="text-blue-600 mr-2"
                                        tooltip="Editar Paciente"
                                    >
                                        <i
                                            className="fa-solid fa-pen-to-square"
                                            aria-label="Editar Paciente"
                                            alt="Editar Paciente"
                                        ></i>{" "}
                                        Editar
                                    </Link>
                                    <span className="text-sm text-gray-300">
                                        |
                                    </span>
                                    {(loggedUser.role.name === "Enfermeria" ||
                                        loggedUser.role.name ===
                                            "Administrativo" ||
                                        loggedUser.role.name ===
                                            "SuperAdmin") && (
                                        <>
                                            <button
                                                className="text-blue-500 hover:underline"
                                                onClick={() =>
                                                    handleModalOpen(paciente)
                                                }
                                            >
                                                <i className="fa-solid fa-notes-medical"></i>{" "}
                                                Nota de Enfermeria
                                            </button>
                                            <span className="text-sm text-gray-300">
                                                |
                                            </span>
                                        </>
                                    )}
                                    <button
                                        onClick={() =>
                                            handleDelete(paciente.id)
                                        }
                                        className="text-red-600 ml-2"
                                    >
                                        <i className="fa-solid fa-trash"></i>{" "}
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                className="px-6 py-4 text-center"
                                colSpan={
                                    userLogged.role.name === "SuperAdmin"
                                        ? 7
                                        : 6
                                }
                            >
                                No hay registros
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <nav
                className="mt-5 flex items-center justify-center text-sm"
                aria-label="Page navigation example"
            >
                {pacientes.links.map((link, index) => (
                    <span key={index} className="mx-1">
                        {link.url ? (
                            <Link
                                href={`${link.url}&search=${searchQuery}`}
                                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                                    link.active
                                        ? "bg-mainbutton text-white border-mainbutton"
                                        : "bg-white text-mainbutton border-gray-300 hover:bg-gray-100"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            ></Link>
                        ) : (
                            <span
                                className="px-4 py-2 rounded-lg border bg-gray-100 text-gray-400"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            ></span>
                        )}
                    </span>
                ))}
            </nav>
        </>
    );
};

export default TablaPacientes;
