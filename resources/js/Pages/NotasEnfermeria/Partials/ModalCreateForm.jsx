import React, { useEffect, useState } from "react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import DatePicker from "react-datepicker";
import { Editor } from "@tinymce/tinymce-react";
import { format } from "date-fns";
import { useForm, usePage, Link } from "@inertiajs/react";
const ModalCreateForm = ({ isOpen, onClose, title, nota }) => {
    console.log(nota);
    if (!isOpen) {
        return null;
    }
    const loggedUser = usePage().props.auth.user;
    const [searchText, setSearchText] = useState("");
    const { data, setData, post, errors, processing, reset } = useForm({
        paciente: nota.paciente.id || "",
        fecha: new Date(),
        nota: "",
        user: loggedUser.id,
    });
    useEffect(() => {
        if (nota.paciente) {
            setSearchText(
                `${nota.paciente.nombres}  ${nota.paciente.apellidos} (${nota.paciente.cedula})`
            );
        }
    }, [nota]);

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
                onClose();
            },
        });
        onErrors: (errors) => {
            console.log(errors);
        };
    };
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-4 w-128">
                    <h2 className="text-xl font-semibold mb-4">
                        {title || "Crear Nota"}
                    </h2>

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
                                        placeholder="Buscar paciente o crear nuevo"
                                        className="w-full border rounded px-3 py-2"
                                        required
                                        disabled
                                    />
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
                                            onChange={(date) =>
                                                setData("fecha", date)
                                            }
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
                </div>
            </div>
        </>
    );
};

export default ModalCreateForm;
