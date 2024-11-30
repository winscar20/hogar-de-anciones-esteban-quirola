import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, usePage, useForm, Link } from "@inertiajs/react";

const Edit = ({ user, roles }) => {
    const { data, setData, put, errors, processing } = useForm({
        name: user.name || "",
        email: user.email || "",
        role_id: user.role_id || "",
        phone: user.phone || "",
        password: "",
        password_confirmation: "",
        is_active: user.is_active === 0 ? false : true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("users.update", user.id), {
            preserveScroll: true,
        });
    };
    console.log(user);
    console.log(data);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edición de usuarios
                </h2>
            }
        >
            <Head title="Editación usuarios" />
            <div className="p-12">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg p-6 max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <div className="text-red-500 text-sm">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            {errors.email && (
                                <div className="text-red-500 text-sm">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Rol</label>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200"
                                value={data.role_id}
                                onChange={(e) =>
                                    setData("role_id", e.target.value)
                                }
                            >
                                <option value="">Selecciona un rol</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                            {errors.role_id && (
                                <div className="text-red-500 text-sm">
                                    {errors.role_id}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Teléfono
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                            />
                            {errors.phone && (
                                <div className="text-red-500 text-sm">
                                    {errors.phone}
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 mb-4 flex items-center">
                            <input
                                type="checkbox"
                                id="is_active"
                                name="is_active"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData("is_active", e.target.checked)
                                }
                                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring focus:ring-green-300"
                            />
                            <label
                                htmlFor="is_active"
                                className="ml-2 text-gray-700 font-medium"
                            >
                                Activo
                            </label>
                        </div>

                        <div className="flex items-center justify-end">
                            <Link
                                href={route("users.index")}
                                className="bg-gray-500 inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 "
                            >
                                Cancelar
                            </Link>
                            <PrimaryButton
                                className="ms-4"
                                disabled={processing}
                            >
                                Actualizar
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
