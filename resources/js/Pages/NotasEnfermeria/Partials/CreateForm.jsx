import React, { useState } from "react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import DatePicker from "react-datepicker";
import { Editor } from "@tinymce/tinymce-react";
import { format } from "date-fns";
import { useForm, usePage, Link } from "@inertiajs/react";
const CreateForm = ({}) => {
    const loggedUser = usePage().props.auth.user;
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [createPaciente, setCreatePaciente] = useState(false);
    const { data, setData, post, errors, processing, reset } = useForm({
        paciente: "",
        fecha: new Date(),
        nota: "",
        user: loggedUser.id,
    });
    const saveNota = (e) => {
        e.preventDefault();
        const formattedDate = format(data.fecha, "yyyy-MM-dd HH:mm:ss");
        post(route("notas-enfermeria.store"), {
            data: {
                ...data,
                fecha: formattedDate, // Usar la fecha formateada
            },
            onSuccess: () => {
                setData("nota", "");
                setData("fecha", new Date());
                setData("paciente", "");
            },
        });
        onErrors: (errors) => {
            console.log(errors);
        };
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchText(query);
        if (query.length > 2) {
            // Realiza la búsqueda de usuarios
            const response = await fetch(
                `/api/pacientes/search?query=${query}`
            );
            const results = await response.json();
            setSearchResults(results);
        } else {
            setSearchResults([]);
            setCreatePaciente(true);
        }
    };

    const handleSelectPaciente = (paciente) => {
        setData({ ...data, paciente: paciente.id });
        setSearchText(
            `${paciente.nombres} ${paciente.apellidos} (${paciente.cedula})`
        );
        setSearchResults([]);
        setCreatePaciente(false);
    };
    return (
        <>
            <form onSubmit={saveNota}>
                <div className="p-12">
                    <div className="overflow-x-auto bg-white p-4 max-w-screen-xl mx-auto">
                        <div className="mt-4 bt-4">
                            <InputLabel className="block text-gray-700 font-medium mb-2">
                                Paciente:
                            </InputLabel>
                            <TextInput
                                type="text"
                                name="paciente"
                                value={searchText}
                                onChange={handleSearch}
                                placeholder="Buscar paciente o crear nuevo"
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                            {searchResults.length > 0 && (
                                <ul className="absolute bg-white border rounded w-6/12 mt-1">
                                    {searchResults.map((paciente) => (
                                        <li
                                            key={paciente.id}
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() =>
                                                handleSelectPaciente(paciente)
                                            }
                                        >
                                            {paciente.nombres}
                                            {paciente.apellidos} (
                                            {paciente.cedula})
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {searchText.length > 2 &&
                                searchResults.length === 0 &&
                                createPaciente && (
                                    <Link
                                        href={route("pacientes.create")}
                                        className="text-blue-600 mt-2"
                                    >
                                        Crear nuevo paciente
                                    </Link>
                                )}
                            <InputError
                                message={errors.paciente}
                                className="mt-2"
                            />
                        </div>
                        <hr className="my-6" />
                        <div className="grid grid-cols-4 gap-6 mb-6">
                            <div className="col-span-1">
                                <InputLabel className="block text-gray-700 font-medium mb-2">
                                    Fecha:
                                </InputLabel>
                                <DatePicker
                                    selected={data.fecha}
                                    onChange={(date) => setData("fecha", date)}
                                    className="w-full border rounded px-3 py-2"
                                    showTimeSelect
                                    dateFormat="Pp" // Fecha y hora
                                />
                                <InputError
                                    message={errors.fecha}
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-3">
                                <InputLabel className="block text-gray-700">
                                    Nota:
                                </InputLabel>
                                <Editor
                                    apiKey="4e42yssu698u0uy1i5qx6ah0gx02y6hsi9nn34ljz0joxuxa"
                                    init={{
                                        height: 250,
                                        menubar: false,
                                        toolbar:
                                            "undo redo | bold italic underline",
                                    }}
                                    value={data.nota || ""}
                                    onEditorChange={(content) =>
                                        setData("nota", content)
                                    }
                                />
                                <InputError
                                    message={errors.nota}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <hr />
                        <div className="mt-4">
                            <Link
                                href={route("notas-enfermeria.index")}
                                className="bg-gray-600 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-400 "
                            >
                                Cancelar
                            </Link>
                            <PrimaryButton
                                className="ms-4"
                                disabled={processing}
                            >
                                Guardar Nota
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
export default CreateForm;
