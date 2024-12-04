import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { toast } from "react-toastify";
import ModalCreateForm from "@/Components/ModalCreateForm";
import ModalCreateNotaMedica from "@/Components/ModalCreateNotaMedica";
import { hasPermission } from "@/utils";

const TablaPacientes = ({ pacientes, filters }) => {
    const loggedUser = usePage().props.auth.user;
    const searchQuery = filters.search || "";
    const { flash } = usePage().props;
    const userLogged = usePage().props.auth.user;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalNotaMedicaOpen, setIsModalNotaMedicaOpen] = useState(false);
    const [nota, setNota] = useState({});

    const openModal = () => setIsModalOpen(true);
    const openModalNotaMedica = () => setIsModalNotaMedicaOpen(true);
    const closeModal = () => {
        setNota({});
        setIsModalOpen(false);
    };
    const closeModalNota = () => {
        setNota({});
        setIsModalNotaMedicaOpen(false);
    };

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            router.delete(route("residentes.destroy", id), {
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

    const handleModalOpen = (paciente, tipo = null) => {
        setNota({
            paciente,
        });
        if (tipo === "medica") {
            openModalNotaMedica();
        } else {
            openModal();
        }
    };
    return (
        <>
            {isModalOpen && (
                <ModalCreateForm
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={"Agregar Nota a Paciente"}
                    nota={nota}
                    redirectTo={"residentes.index"}
                ></ModalCreateForm>
            )}
            {isModalNotaMedicaOpen && (
                <ModalCreateNotaMedica
                    isOpen={isModalNotaMedicaOpen}
                    onClose={closeModalNota}
                    title={"Agregar Nota Médica a Residente"}
                    nota={nota}
                    redirectTo={"residentes.index"}
                ></ModalCreateNotaMedica>
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
                                    {hasPermission(
                                        loggedUser.role.name,
                                        "editar_residentes"
                                    ) && (
                                        <>
                                            <Link
                                                href={route(
                                                    "residentes.edit",
                                                    paciente.id
                                                )}
                                                className="text-blue-600 mr-2"
                                                tooltip="Editar Residente"
                                            >
                                                <i
                                                    className="fa-solid fa-pen-to-square"
                                                    aria-label="Editar Residente"
                                                    alt="Editar Residente"
                                                ></i>{" "}
                                                Editar
                                            </Link>
                                            <span className="text-sm text-gray-300">
                                                |
                                            </span>
                                        </>
                                    )}
                                    {hasPermission(
                                        loggedUser.role.name,
                                        "crear_notas_enfermeria"
                                    ) && (
                                        <>
                                            <button
                                                className="text-blue-500 hover:underline"
                                                onClick={() =>
                                                    handleModalOpen(paciente)
                                                }
                                            >
                                                <i className="fa-solid fa-notes-medical"></i>{" "}
                                                Nota de Enfermeria (
                                                {
                                                    paciente.notas_enfermeria_count
                                                }
                                                )
                                            </button>
                                        </>
                                    )}
                                    {hasPermission(
                                        loggedUser.role.name,
                                        "crear_notas_medicas"
                                    ) && (
                                        <>
                                            <button
                                                className="text-blue-500 hover:underline"
                                                onClick={() =>
                                                    handleModalOpen(
                                                        paciente,
                                                        "medica"
                                                    )
                                                }
                                            >
                                                <i className="fa-solid fa-notes-medical"></i>{" "}
                                                Nota Médica (
                                                {paciente.notas_medicas_count})
                                            </button>
                                        </>
                                    )}
                                    {hasPermission(
                                        loggedUser.role.name,
                                        "eliminar_residentes"
                                    ) && (
                                        <button
                                            onClick={() =>
                                                handleDelete(paciente.id)
                                            }
                                            className="text-red-600 ml-2"
                                        >
                                            <i className="fa-solid fa-trash"></i>{" "}
                                            Eliminar
                                        </button>
                                    )}
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
