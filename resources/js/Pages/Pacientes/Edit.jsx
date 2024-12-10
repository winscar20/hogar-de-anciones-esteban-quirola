import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, usePage, useForm, Link } from "@inertiajs/react";
import { Editor } from "@tinymce/tinymce-react";
import DatePicker from "react-datepicker";
import FormTitleHeader from "@/Components/FormTitleHeader";
import { calcularEdad } from "@/utils";
import { format } from "date-fns";

const Edit = ({ paciente }) => {
    const [fechaNacimiento, setFechaNacimiento] = useState(null);
    const handleFechaChange = (date) => {
        setFechaNacimiento(date);
        setData({
            ...data,
            edad: calcularEdad(date),
            fecha_nacimiento: date,
        });
    };
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [createUserFlag, setCreateUserFlag] = useState(false);
    const { data, setData, put, errors, processing, reset } = useForm({
        nombres: paciente.nombres || "",
        apellidos: paciente.apellidos || "",
        cedula: paciente.cedula || "",
        estado_civil: paciente.estado_civil || "",
        ocupacion: paciente.ocupacion || "",
        telefono: paciente.telefono || "",
        motivo_ingreso: paciente.motivo_ingreso || "",
        antecedentes_patologicos: paciente.antecedentes_patologicos || "",
        enfermedad_actual: paciente.enfermedad_actual || "",
        responsable: paciente.responsable.id || "",
        inventario: paciente.inventario || "",
        fecha_nacimiento: new Date(paciente.fecha_nacimiento) || "",
        edad: paciente.edad || "",
    });

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchText(query);
        if (query.length > 2) {
            // Realiza la búsqueda de usuarios
            const response = await fetch(`/api/users/search?query=${query}`);
            const results = await response.json();
            setSearchResults(results);
        } else {
            setSearchResults([]);
            setCreateUserFlag(true);
        }
    };
    const updatePaciente = (e) => {
        e.preventDefault();
        put(route("residentes.update", paciente.id), {
            preserveScroll: true,
        });
    };

    const handleSelectUser = (user) => {
        setData({ ...data, responsable: user.id });
        setSearchText(`${user.name} (${user.email})`);
        setSearchResults([]);
        setCreateUserFlag(false);
    };

    useEffect(() => {
        if (paciente.responsable) {
            setSearchText(
                `${paciente.responsable.name} (${paciente.responsable.email})`
            );
        }
    }, [paciente]);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Modificar Residente
                </h2>
            }
        >
            <Head title="Crear Residente" />
            <form onSubmit={updatePaciente}>
                <div className="p-12">
                    <div className="overflow-x-auto bg-white p-4 max-w-screen-xl mx-auto">
                        <fieldset className="border border-solid border-blue-400 p-3 pb-6 mb-6">
                            <legend className="text-sm text-blue-800">
                                Usuario Responsable
                            </legend>
                            <div className="mt-4 bt-4">
                                <InputLabel className="block text-gray-700 font-medium mb-2">
                                    Usuario:
                                </InputLabel>
                                <TextInput
                                    type="text"
                                    name="responsable"
                                    value={searchText}
                                    onChange={handleSearch}
                                    placeholder="Buscar usuario o crear nuevo"
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                                {searchResults.length > 0 && (
                                    <ul className="absolute bg-white border rounded w-6/12 mt-1">
                                        {searchResults.map((user) => (
                                            <li
                                                key={user.id}
                                                className="p-2 cursor-pointer hover:bg-gray-200"
                                                onClick={() =>
                                                    handleSelectUser(user)
                                                }
                                            >
                                                {user.name} ({user.email})
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {searchText.length > 2 &&
                                    searchResults.length === 0 &&
                                    createUserFlag && (
                                        <Link
                                            href={route("users.create")}
                                            className="text-blue-600 mt-2"
                                        >
                                            Crear nuevo usuario
                                        </Link>
                                    )}
                                <InputError
                                    message={errors.responsable}
                                    className="mt-2"
                                />
                            </div>
                        </fieldset>
                        <fieldset className="border border-solid border-green-400 p-3 pb-6 mb-6 mt-6">
                            <legend className="text-sm text-green-800">
                                Información del Residente
                            </legend>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <InputLabel className="block text-gray-700 font-medium mb-2">
                                        Nombres:
                                    </InputLabel>
                                    <TextInput
                                        type="text"
                                        name="nombres"
                                        value={data.nombres || ""}
                                        onChange={(e) =>
                                            setData("nombres", e.target.value)
                                        }
                                        placeholder="Ej. Juan"
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                    <InputError
                                        message={errors.nombres}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel className="block text-gray-700 font-medium mb-2">
                                        Apellidos:
                                    </InputLabel>
                                    <TextInput
                                        type="text"
                                        name="apellidos"
                                        value={data.apellidos || ""}
                                        onChange={(e) =>
                                            setData("apellidos", e.target.value)
                                        }
                                        placeholder="Ej. Perez"
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                    <InputError
                                        message={errors.apellidos}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <InputLabel className="block text-gray-700">
                                        Cédula
                                    </InputLabel>
                                    <TextInput
                                        type="text"
                                        name="cedula"
                                        value={data.cedula || ""}
                                        onChange={(e) =>
                                            setData("cedula", e.target.value)
                                        }
                                        placeholder="Ej. 0724532245"
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                    <InputError
                                        message={errors.cedula}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel className="block text-gray-700">
                                        Estado Civil
                                    </InputLabel>
                                    <select
                                        name="estado_civil"
                                        value={data.estado_civil || ""}
                                        onChange={(e) =>
                                            setData(
                                                "estado_civil",
                                                e.target.value
                                            )
                                        }
                                        className="border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 w-full border rounded px-3 py-2"
                                        required
                                    >
                                        <option value="">Seleccione</option>
                                        <option value="CASADO">Casado</option>
                                        <option value="SOLTERO">Soltero</option>
                                        <option value="DIVORCIADO">
                                            Divorciado
                                        </option>
                                        <option value="VIUDO">Viudo</option>
                                    </select>
                                    <InputError
                                        message={errors.estado_civil}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* Campo Ocupación */}
                                <div>
                                    <InputLabel className="block text-gray-700">
                                        Ocupación
                                    </InputLabel>
                                    <TextInput
                                        type="text"
                                        name="ocupacion"
                                        value={data.ocupacion || ""}
                                        onChange={(e) =>
                                            setData("ocupacion", e.target.value)
                                        }
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    <InputError
                                        message={errors.ocupacion}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Campo Telefono */}
                                <div>
                                    <InputLabel className="block text-gray-700">
                                        Telefono
                                    </InputLabel>
                                    <TextInput
                                        type="text"
                                        name="telefono"
                                        value={data.telefono || ""}
                                        onChange={(e) =>
                                            setData("telefono", e.target.value)
                                        }
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    <InputError
                                        message={errors.telefono}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <InputLabel className="block text-gray-700">
                                        Fecha de Nacimiento
                                    </InputLabel>
                                    <DatePicker
                                        selected={data.fecha_nacimiento}
                                        onChange={handleFechaChange}
                                        className="border rounded px-3 py-2 w-full"
                                        placeholderText="Selecciona una fecha"
                                        dateFormat="yyyy-MM-dd"
                                        showYearDropdown
                                        yearDropdownItemNumber={120}
                                        scrollableYearDropdown
                                        popperPlacement="right" // Selección automática según el espacio
                                    />
                                    <InputError
                                        message={errors.fecha_nacimiento}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Campo telefono */}
                                <div>
                                    <InputLabel className="block text-gray-700">
                                        Edad:
                                    </InputLabel>
                                    <TextInput
                                        type="text"
                                        name="edad"
                                        value={data.edad || ""}
                                        onChange={(e) =>
                                            setData("edad", e.target.value)
                                        }
                                        className="w-full  px-3 py-2 block border border-gray-300 bg-gray-200 text-gray-700 rounded-md p-2 cursor-not-allowed"
                                        disabled
                                    />
                                    <InputError
                                        message={errors.edad}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <FormTitleHeader title="Anamnesis" />
                            </div>
                            {/* Textareas con TinyMCE */}
                            <div className="col-span-2">
                                <InputLabel className="block text-gray-700">
                                    Motivo de Ingreso:
                                </InputLabel>
                                <Editor
                                    apiKey="4e42yssu698u0uy1i5qx6ah0gx02y6hsi9nn34ljz0joxuxa"
                                    init={{
                                        height: 200,
                                        menubar: false, // Ocultar barra de menú
                                        toolbar:
                                            "undo redo | bold italic underline", // Herramientas personalizadas
                                        // plugins: ["link lists"], // Plugins necesarios
                                    }}
                                    value={data.motivo_ingreso || ""}
                                    onEditorChange={(content) =>
                                        setData("motivo_ingreso", content)
                                    }
                                />
                            </div>
                            <div className="col-span-2 mt-6 mb-6">
                                <InputLabel className="block text-gray-700">
                                    Antecedentes Patológicos:
                                </InputLabel>
                                <Editor
                                    apiKey="4e42yssu698u0uy1i5qx6ah0gx02y6hsi9nn34ljz0joxuxa"
                                    init={{
                                        height: 200,
                                        menubar: false, // Ocultar barra de menú
                                        toolbar:
                                            "undo redo | bold italic underline", // Herramientas personalizadas
                                        // plugins: ["link lists"], // Plugins necesarios
                                    }}
                                    value={data.antecedentes_patologicos || ""}
                                    onEditorChange={(content) =>
                                        setData(
                                            "antecedentes_patologicos",
                                            content
                                        )
                                    }
                                />
                            </div>
                            <div className="col-span-2 mt-6 mb-6">
                                <InputLabel className="block text-gray-700">
                                    Enfermedad Actual:
                                </InputLabel>
                                <Editor
                                    apiKey="4e42yssu698u0uy1i5qx6ah0gx02y6hsi9nn34ljz0joxuxa"
                                    init={{
                                        height: 200,
                                        menubar: false, // Ocultar barra de menú
                                        toolbar:
                                            "undo redo | bold italic underline", // Herramientas personalizadas
                                        // plugins: ["link lists"], // Plugins necesarios
                                    }}
                                    value={data.enfermedad_actual || ""}
                                    onEditorChange={(content) =>
                                        setData("enfermedad_actual", content)
                                    }
                                />
                            </div>
                            <div>
                                <FormTitleHeader title="Inventario del Residente" />
                            </div>
                            <div className="col-span-2 mt-6 mb-6">
                                <InputLabel className="block text-gray-700">
                                    Describa las cosas con las que llego el
                                    Residente:
                                </InputLabel>
                                <Editor
                                    apiKey="4e42yssu698u0uy1i5qx6ah0gx02y6hsi9nn34ljz0joxuxa"
                                    init={{
                                        height: 200,
                                        menubar: false, // Ocultar barra de menú
                                        toolbar:
                                            "undo redo | bold italic underline", // Herramientas personalizadas
                                        // plugins: ["link lists"], // Plugins necesarios
                                    }}
                                    value={data.inventario || ""}
                                    onEditorChange={(content) =>
                                        setData("inventario", content)
                                    }
                                />
                            </div>
                        </fieldset>
                        <div className="mt-4">
                            <Link
                                href={route("residentes.index")}
                                className="bg-gray-600 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-400 "
                            >
                                Cancelar
                            </Link>
                            <PrimaryButton
                                className="ms-4"
                                disabled={processing}
                            >
                                Guardar Residente
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
};

export default Edit;
