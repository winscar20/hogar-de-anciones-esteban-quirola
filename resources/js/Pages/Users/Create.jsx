import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, usePage, useForm } from "@inertiajs/react";

const Create = () => {
    const { roles } = usePage().props;
    const loggedUser = usePage().props.auth.user;

    const { data, setData, post, errors, processing, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        role: 0,
        password: "",
        password_confirmation: "",
        is_active: true,
    });
    const saveUser = (e) => {
        e.preventDefault();

        post(route("users.store"), {
            onSuccess: () => {
                setData("name", "");
                setData("email", "");
                setData("phone", "");
                setData("role", 0);
                setData("is_active", true);
            },

            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Creación de usuarios
                </h2>
            }
        >
            <Head title="Creación de usuarios" />
            <form onSubmit={saveUser}>
                <div className="p-12">
                    <div className="overflow-x-auto bg-white p-4 max-w-screen-xl mx-auto">
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Nombre
                            </label>
                            <TextInput
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                                placeholder="Nombre"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Email
                            </label>
                            <TextInput
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                                placeholder="Email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="phone"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Teléfono
                            </label>
                            <TextInput
                                type="tel"
                                id="phone"
                                name="phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-green-300"
                                placeholder="Teléfono"
                                required
                            />
                            <InputError
                                message={errors.phone}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="role"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Rol
                            </label>
                            <select
                                id="role"
                                name="role"
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-green-300"
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                                required
                            >
                                {roles
                                    .filter((rol) => {
                                        if (
                                            loggedUser.role.name ===
                                            "SuperAdmin"
                                        ) {
                                            return true;
                                        }

                                        if (
                                            loggedUser.role.name ===
                                            "Administrativo"
                                        ) {
                                            return rol.name !== "SuperAdmin";
                                        }

                                        if (
                                            loggedUser.role.name === "Doctor" ||
                                            loggedUser.role.name ===
                                                "Enfermeria"
                                        ) {
                                            return [
                                                "Doctor",
                                                "Enfermeria",
                                                "Externo",
                                            ].includes(rol.name);
                                        }
                                        return false;
                                    })
                                    .map((rol) => (
                                        <option key={rol.id} value={rol.id}>
                                            {rol.name}
                                        </option>
                                    ))}
                            </select>
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
                                required
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
                                required
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

                        <div className="mt-6">
                            <PrimaryButton
                                className="ms-4"
                                disabled={processing}
                            >
                                Guardar Usuario
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
};

export default Create;
