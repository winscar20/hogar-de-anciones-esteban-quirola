import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { toast } from "react-toastify";

const TablaUsuarios = ({ users, filters }) => {
    const searchQuery = filters.search || "";
    const { flash } = usePage().props;
    const userLogged = usePage().props.auth.user;
    const [showFlash, setShowFlash] = useState(
        !!flash?.success || !!flash?.error
    );
    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            router.delete(route("users.destroy", id), {
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
    return (
        <>
            <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600">
                    <tr>
                        <th scope="col" className="px-6 py-4">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-4">
                            NOMBRE
                        </th>
                        <th scope="col" className="px-6 py-4">
                            TELEFONO
                        </th>
                        <th scope="col" className="px-6 py-4">
                            EMAIL
                        </th>
                        <th scope="col" className="px-6 py-4">
                            ROL
                        </th>
                        <th>ESTADO</th>
                        {userLogged.role.name === "SuperAdmin" && (
                            <th scope="col" className="px-6 py-4">
                                ACCION
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {users.data.length > 0 ? (
                        users.data.map((user) => (
                            <tr
                                className="border-b hover:bg-neutral-50 "
                                key={user.id}
                            >
                                <th scope="row" className="px-6 py-4">
                                    USR0{user.id}
                                </th>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.phone}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.role.name}</td>
                                <td className="px-6 py-4">
                                    {user.is_active ? (
                                        <span>Activo</span>
                                    ) : (
                                        <span>Inactivo</span>
                                    )}
                                </td>
                                {userLogged.role.name !== "Externo" && (
                                    <td className="px-6 py-4">
                                        <Link
                                            href={route("users.edit", user.id)}
                                            className="text-blue-600 mr-2"
                                        >
                                            Editar
                                        </Link>
                                        |
                                        <button
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                            className="text-red-600 ml-2"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={
                                    userLogged.role.name === "SuperAdmin"
                                        ? 7
                                        : 6
                                }
                                className="px-6 py-4 text-center"
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
                {users.links.map((link, index) => (
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
                            />
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

export default TablaUsuarios;
