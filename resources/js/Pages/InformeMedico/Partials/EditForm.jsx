import React, { useEffect, useState } from "react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import FormTitleHeader from "@/Components/FormTitleHeader";
import DatePicker from "react-datepicker";
import { Editor } from "@tinymce/tinymce-react";
import { format } from "date-fns";
import { useForm, usePage, Link } from "@inertiajs/react";
const EditForm = ({ informe }) => {
    const loggedUser = usePage().props.auth.user;
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [createPaciente, setCreatePaciente] = useState(false);
    const [showResidenteInfo, setShowResidenteInfo] = useState(true);
    const { data, setData, put, errors, processing, reset } = useForm({
        paciente: informe.paciente.id || "",
        doctor: informe.doctor.id || loggedUser.id,
        fecha_inicio: new Date(informe.fecha_inicio) || new Date(),
        fecha_fin: new Date(informe.fecha_fin) || new Date(),
        apa_sis_circulatorio: informe.apa_sis_circulatorio || "",
        apa_sis_nervioso: informe.apa_sis_nervioso || "",
        apa_sis_endocrino: informe.apa_sis_endocrino || "",
        tratamiento_actual: informe.tratamiento_actual || "",
        dieta_nutricion: informe.dieta_nutricion || "",
        presion_arterial: informe.presion_arterial || "",
        esfera_funcional: informe.esfera_funcional || "",
        esfera_mental: informe.esfera_mental || "",
        esfera_social: informe.esfera_social || "",
        conclusion: informe.conclusion || "",
        recomendaciones: informe.recomendaciones || "",
        paciente_info: informe.paciente || {},
    });
    const updateInforme = (e) => {
        e.preventDefault();
        const formattedDateInicio = format(data.fecha_inicio, "yyyy-MM-dd");
        const formattedDateFin = format(data.fecha_fin, "yyyy-MM-dd");
        put(route("informes-medicos.update", informe.id), {
            data: {
                ...data,
                fecha_inicio: formattedDateInicio,
                fecha_fin: formattedDateFin,
            },
            onSuccess: () => {
                setData("paciente", informe.paciente.id);
                setData("fecha_inicio", new Date(informe.fecha_inicio));
                setData("fecha_fin", new Date(informe.fecha_fin));
                setData("apa_sis_circulatorio", informe.apa_sis_circulatorio);
                setData("apa_sis_nervioso", informe.apa_sis_nervioso);
                setData("apa_sis_endocrino", informe.apa_sis_endocrino);
                setData("tratamiento_actual", informe.tratamiento_actual);
                setData("dieta_nutricion", informe.dieta_nutricion);
                setData("presion_arterial", informe.presion_arterial);
                setData("esfera_funcional", informe.esfera_funcional);
                setData("esfera_mental", informe.esfera_mental);
                setData("esfera_social", informe.esfera_social);
                setData("conclusion", informe.conclusion);
                setData("recomendaciones", informe.recomendaciones);
                setData("paciente_info", informe.paciente);
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
                `/api/residentes/search?query=${query}`
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
        setShowResidenteInfo(true);
    };

    useEffect(() => {
        if (informe.paciente) {
            setSearchText(
                `${informe.paciente.nombres}  ${informe.paciente.apellidos} (${informe.paciente.cedula})`
            );
        }
    }, [informe]);
    return (
        <>
            <form onSubmit={updateInforme}>
                <div className="p-12">
                    <div className="overflow-x-auto bg-white p-4 max-w-screen-xl mx-auto">
                        <fieldset className="border border-solid border-blue-400 p-3 pb-6 mb-6 rounded">
                            <legend className="text-sm text-blue-800">
                                Busqueda de Residente
                            </legend>
                            <div className="mt-4 bt-4">
                                <InputLabel className="block text-gray-700 font-medium mb-2">
                                    Residente:
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
                                                    handleSelectPaciente(
                                                        paciente
                                                    )
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
                                            href={route("residentes.create")}
                                            className="text-blue-600 mt-2"
                                        >
                                            Crear nuevo Residente
                                        </Link>
                                    )}
                                <InputError
                                    message={errors.paciente}
                                    className="mt-2"
                                />
                            </div>
                        </fieldset>

                        {showResidenteInfo && (
                            <fieldset className="border border-solid border-grey-400 p-3 pb-6 mb-6 rounded bg-slate-100">
                                <legend className="text-sm text-green-800">
                                    Formulario de Informe Médico
                                </legend>
                                <FormTitleHeader title="Fecha del informe" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="flex">
                                        <InputLabel className="block text-gray-700 font-medium mb-2 mr-2 pt-3">
                                            Fecha de inicio:
                                        </InputLabel>
                                        <DatePicker
                                            selected={data.fecha_inicio}
                                            onChange={(date) =>
                                                setData("fecha_inicio", date)
                                            }
                                            className="w-full border rounded px-3 py-2"
                                            placeholderText="Seleccione una fecha"
                                            dateFormat="yyyy-MM-dd"
                                            showPopperArrow={false}
                                            isClearable
                                            required
                                        />
                                        <InputError
                                            message={errors.fecha_inicio}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="flex">
                                        <InputLabel className="block text-gray-700 font-medium mb-2 mr-2 pt-3">
                                            Fecha Final:
                                        </InputLabel>
                                        <DatePicker
                                            selected={data.fecha_fin}
                                            onChange={(date) =>
                                                setData("fecha_fin", date)
                                            }
                                            className="w-full border rounded px-3 py-2"
                                            placeholderText="Seleccione una fecha"
                                            dateFormat="yyyy-MM-dd"
                                            showPopperArrow={false}
                                            isClearable
                                        />
                                        <InputError
                                            message={errors.fecha_fin}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <FormTitleHeader title="información del residente" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Nombres
                                        </InputLabel>
                                        <TextInput
                                            type="text"
                                            name="nombres"
                                            value={
                                                data.paciente_info.nombres || ""
                                            }
                                            className="w-full  px-3 py-2 block border border-gray-300 bg-gray-200 text-gray-700 rounded-md p-2 cursor-not-allowed"
                                            readOnly
                                            disabled
                                            required
                                        />
                                    </div>
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Apellidos
                                        </InputLabel>
                                        <TextInput
                                            type="text"
                                            name="apellidos"
                                            value={
                                                data.paciente_info.apellidos ||
                                                ""
                                            }
                                            className="w-full  px-3 py-2 block border border-gray-300 bg-gray-200 text-gray-700 rounded-md p-2 cursor-not-allowed"
                                            disabled
                                            readOnly
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Identificación
                                        </InputLabel>
                                        <TextInput
                                            type="text"
                                            name="cedula"
                                            value={
                                                data.paciente_info.cedula || ""
                                            }
                                            className="w-full  px-3 py-2 block border border-gray-300 bg-gray-200 text-gray-700 rounded-md p-2 cursor-not-allowed"
                                            readOnly
                                            disabled
                                            required
                                        />
                                    </div>
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Fecha de Ingreso al Servicio
                                        </InputLabel>
                                        <TextInput
                                            type="text"
                                            name="fecha_ingreso"
                                            value={
                                                format(
                                                    data.paciente_info
                                                        .created_at,
                                                    "yyyy-MM-dd"
                                                ) || ""
                                            }
                                            className="w-full  px-3 py-2 block border border-gray-300 bg-gray-200 text-gray-700 rounded-md p-2 cursor-not-allowed"
                                            disabled
                                            readOnly
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Estado Civíl
                                        </InputLabel>
                                        <TextInput
                                            type="text"
                                            name="estado_civil"
                                            value={
                                                data.paciente_info
                                                    .estado_civil || ""
                                            }
                                            className="w-full  px-3 py-2 block border border-gray-300 bg-gray-200 text-gray-700 rounded-md p-2 cursor-not-allowed"
                                            readOnly
                                            disabled
                                            required
                                        />
                                    </div>
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Ocupación
                                        </InputLabel>
                                        <TextInput
                                            type="text"
                                            name="fecha_ingreso"
                                            value={
                                                data.paciente_info.ocupacion ||
                                                ""
                                            }
                                            className="w-full  px-3 py-2 block border border-gray-300 bg-gray-200 text-gray-700 rounded-md p-2 cursor-not-allowed"
                                            disabled
                                            readOnly
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Responsable
                                        </InputLabel>
                                        <TextInput
                                            type="text"
                                            name="estado_civil"
                                            value={
                                                data.paciente_info.responsable
                                                    .name || ""
                                            }
                                            className="w-full  px-3 py-2 block border border-gray-300 bg-gray-200 text-gray-700 rounded-md p-2 cursor-not-allowed"
                                            readOnly
                                            disabled
                                            required
                                        />
                                    </div>
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Teléfono
                                        </InputLabel>
                                        <TextInput
                                            type="text"
                                            name="telefono"
                                            value={
                                                data.paciente_info.telefono ||
                                                ""
                                            }
                                            className="w-full  px-3 py-2 block border border-gray-300 bg-gray-200 text-gray-700 rounded-md p-2 cursor-not-allowed"
                                            disabled
                                            readOnly
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Fecha de Naacimiento
                                        </InputLabel>
                                        <TextInput
                                            type="text"
                                            name="fecha_nacimiento"
                                            value={format(
                                                data.paciente_info
                                                    .fecha_nacimiento,
                                                "yyyy-MM-dd"
                                            )}
                                            className="w-full  px-3 py-2 block border border-gray-300 bg-gray-200 text-gray-700 rounded-md p-2 cursor-not-allowed"
                                            readOnly
                                            disabled
                                            required
                                        />
                                    </div>
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Edad
                                        </InputLabel>
                                        <TextInput
                                            type="text"
                                            name="edad"
                                            value={
                                                data.paciente_info.edad || ""
                                            }
                                            className="w-full  px-3 py-2 block border border-gray-300 bg-gray-200 text-gray-700 rounded-md p-2 cursor-not-allowed"
                                            disabled
                                            readOnly
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1  gap-6 mb-6">
                                    <div>
                                        <InputLabel className="block text-gray-700 pb-2">
                                            Motivo de Ingreso:
                                        </InputLabel>
                                        <p
                                            className="text-sm  uppercase italic"
                                            dangerouslySetInnerHTML={{
                                                __html: data.paciente_info
                                                    .motivo_ingreso,
                                            }}
                                        ></p>
                                    </div>
                                </div>

                                <FormTitleHeader title="Anamnesis" />

                                <div className="grid grid-cols-1  gap-6 mb-6">
                                    <div>
                                        <InputLabel className="block text-gray-700 pb-2">
                                            Antecedentes Patológicos Personales:
                                        </InputLabel>
                                        <p
                                            className="text-sm  uppercase italic"
                                            dangerouslySetInnerHTML={{
                                                __html: data.paciente_info
                                                    .antecedentes_patologicos,
                                            }}
                                        ></p>
                                    </div>
                                </div>

                                <div className="overflow-x-auto  max-w-screen-xl mx-auto text-left uppercase text-black text-sm font-semibold mb-6">
                                    Revision Aparatos y Sistemas
                                </div>

                                <div className="grid grid-cols-2  gap-6 mb-6">
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Aparato Circulatorio:
                                        </InputLabel>
                                        <Editor
                                            className="pt-0 mt-0"
                                            apiKey="4e42yssu698u0uy1i5qx6ah0gx02y6hsi9nn34ljz0joxuxa"
                                            init={{
                                                height: 150,
                                                menubar: false,
                                                toolbar:
                                                    "undo redo | bold italic underline",
                                            }}
                                            value={
                                                data.apa_sis_circulatorio || ""
                                            }
                                            onEditorChange={(content) =>
                                                setData(
                                                    "apa_sis_circulatorio",
                                                    content
                                                )
                                            }
                                        />
                                        <InputError
                                            message={
                                                errors.apa_sis_circulatorio
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Sistema Nervioso:
                                        </InputLabel>
                                        <Editor
                                            className="pt-0 mt-0"
                                            apiKey="4e42yssu698u0uy1i5qx6ah0gx02y6hsi9nn34ljz0joxuxa"
                                            init={{
                                                height: 150,
                                                menubar: false,
                                                toolbar:
                                                    "undo redo | bold italic underline",
                                            }}
                                            value={data.apa_sis_nervioso || ""}
                                            onEditorChange={(content) =>
                                                setData(
                                                    "apa_sis_nervioso",
                                                    content
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.apa_sis_nervioso}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2  gap-6 mb-6">
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Sistema Encocrino:
                                        </InputLabel>
                                        <Editor
                                            className="pt-0 mt-0"
                                            apiKey="4e42yssu698u0uy1i5qx6ah0gx02y6hsi9nn34ljz0joxuxa"
                                            init={{
                                                height: 150,
                                                menubar: false,
                                                toolbar:
                                                    "undo redo | bold italic underline",
                                            }}
                                            value={data.apa_sis_endocrino || ""}
                                            onEditorChange={(content) =>
                                                setData(
                                                    "apa_sis_endocrino",
                                                    content
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.apa_sis_endocrino}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Dieta y Nutrición:
                                        </InputLabel>
                                        <Editor
                                            className="pt-0 mt-0"
                                            apiKey="4e42yssu698u0uy1i5qx6ah0gx02y6hsi9nn34ljz0joxuxa"
                                            init={{
                                                height: 150,
                                                menubar: false,
                                                toolbar:
                                                    "undo redo | bold italic underline",
                                            }}
                                            value={data.dieta_nutricion || ""}
                                            onEditorChange={(content) =>
                                                setData(
                                                    "dieta_nutricion",
                                                    content
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.dieta_nutricion}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1  gap-6 mb-6">
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Tratamiento Actual:
                                        </InputLabel>
                                        <Editor
                                            className="pt-0 mt-0"
                                            apiKey="4e42yssu698u0uy1i5qx6ah0gx02y6hsi9nn34ljz0joxuxa"
                                            init={{
                                                height: 150,
                                                menubar: false,
                                                toolbar:
                                                    "undo redo | bold italic underline",
                                            }}
                                            value={
                                                data.tratamiento_actual || ""
                                            }
                                            onEditorChange={(content) =>
                                                setData(
                                                    "tratamiento_actual",
                                                    content
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.tratamiento_actual}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="overflow-x-auto  max-w-screen-xl mx-auto text-left uppercase text-black text-sm font-semibold mb-6 mt-8">
                                    exploración físico
                                </div>
                                <div className="grid grid-cols-1  gap-6 mb-6">
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Presion Arterial:
                                        </InputLabel>
                                        <TextInput
                                            type="text"
                                            name="presion_arterial"
                                            value={data.presion_arterial || ""}
                                            placeholder="Ejemplo: 120/80"
                                            onChange={(e) =>
                                                setData(
                                                    "presion_arterial",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded px-3 py-2"
                                        />
                                        <InputError
                                            message={errors.presion_arterial}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <FormTitleHeader title="Valoración en la esfera funcional, social y mental" />

                                <div className="grid grid-cols-1  gap-6 mb-6">
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Esfera Funcional:
                                        </InputLabel>
                                        <TextInput
                                            type="text"
                                            name="esfera_funcional"
                                            value={data.esfera_funcional || ""}
                                            onChange={(e) =>
                                                setData(
                                                    "esfera_funcional",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded px-3 py-2"
                                        />
                                        <InputError
                                            message={errors.esfera_funcional}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1  gap-6 mb-6">
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Esfera Mental:
                                        </InputLabel>
                                        <TextInput
                                            type="text"
                                            name="esfera_mental"
                                            value={data.esfera_mental || ""}
                                            onChange={(e) =>
                                                setData(
                                                    "esfera_mental",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded px-3 py-2"
                                        />
                                        <InputError
                                            message={errors.esfera_mental}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1  gap-6 mb-6">
                                    <div>
                                        <InputLabel className="block text-gray-700">
                                            Esfera Social:
                                        </InputLabel>
                                        <TextInput
                                            type="text"
                                            name="esfera_social"
                                            value={data.esfera_social || ""}
                                            onChange={(e) =>
                                                setData(
                                                    "esfera_social",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded px-3 py-2"
                                        />
                                        <InputError
                                            message={errors.esfera_social}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <FormTitleHeader title="Conclusión" />
                                <div className="grid grid-cols-1  gap-6 mb-6">
                                    <div>
                                        <Editor
                                            className="pt-0 mt-0"
                                            apiKey="4e42yssu698u0uy1i5qx6ah0gx02y6hsi9nn34ljz0joxuxa"
                                            init={{
                                                height: 150,
                                                menubar: false,
                                                toolbar:
                                                    "undo redo | bold italic underline",
                                            }}
                                            value={data.conclusion || ""}
                                            onEditorChange={(content) =>
                                                setData("conclusion", content)
                                            }
                                        />
                                        <InputError
                                            message={errors.conclusion}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <FormTitleHeader title="Recomendaciones" />
                                <div className="grid grid-cols-1  gap-6 mb-6">
                                    <div>
                                        <Editor
                                            className="pt-0 mt-0"
                                            apiKey="4e42yssu698u0uy1i5qx6ah0gx02y6hsi9nn34ljz0joxuxa"
                                            init={{
                                                height: 150,
                                                menubar: false,
                                                toolbar:
                                                    "undo redo | bold italic underline",
                                            }}
                                            value={data.recomendaciones || ""}
                                            onEditorChange={(content) =>
                                                setData(
                                                    "recomendaciones",
                                                    content
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.recomendaciones}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </fieldset>
                        )}
                        <div className="mt-4">
                            <Link
                                href={route("informes-medicos.index")}
                                className="bg-gray-600 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-400 "
                            >
                                Cancelar
                            </Link>
                            <PrimaryButton
                                className="ms-4"
                                disabled={processing || !showResidenteInfo}
                            >
                                Guardar Nota Médica
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
export default EditForm;
