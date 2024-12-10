import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link } from "@inertiajs/react";
import html2pdf from "html2pdf.js";
import { format } from "date-fns";
import { obtenerRangoMeses } from "@/utils";
import FormTitleHeader from "@/Components/FormTitleHeader";
const Show = ({ informe }) => {
    console.log(informe);
    const descargarPDF = () => {
        // Seleccionamos el elemento que se quiere convertir en PDF
        const element = document.getElementById("content-to-pdf");

        // Configuración para html2pdf
        const options = {
            margin: 0,
            filename: `informe_medico_${informe.paciente.cedula}.pdf`, // El nombre del archivo
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 4 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        // Generamos y descargamos el PDF
        html2pdf().from(element).set(options).save();
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center sticky">
                    <h2 className="flex-1 text-xl font-semibold leading-tight text-gray-800">
                        Informe médico de {informe.paciente.nombres}{" "}
                        {informe.paciente.apellidos}
                    </h2>
                    <button
                        id="download-pdf"
                        onClick={descargarPDF}
                        className="flex-none  px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        <i className="fa-solid fa-file-arrow-down flex mr-2"></i>
                        Descargar
                    </button>
                </div>
            }
        >
            <Head title="Vista Informe Médico" />
            {/*  */}
            {/* <EditForm informe={informe}></EditForm> */}
            <div id="content-to-pdf" className="px-19 pt-6">
                <div className="overflow-x-auto bg-white p-4 max-w-screen-xl mx-auto">
                    <div className="flex justify-center">
                        <h1 className="text-black font-bold ">
                            Informe Médico de {informe.paciente.nombres}{" "}
                            {informe.paciente.apellidos}
                        </h1>
                    </div>
                    <div className="flex justify-center mb-4">
                        <h2 className="text-black uppercase">
                            Fecha:{" "}
                            {obtenerRangoMeses(
                                format(
                                    new Date(informe.fecha_inicio),
                                    "yyyy-MM-dd"
                                ),
                                format(
                                    new Date(informe.fecha_fin),
                                    "yyyy-MM-dd"
                                )
                            )}
                        </h2>
                    </div>
                    <FormTitleHeader title="Información del Residente" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-sm">
                        <div>
                            <span className="font-bold">Nombres:</span>
                            <p className="bg-slate-200 p-2 mt-2">
                                {informe.paciente.nombres}
                            </p>
                        </div>
                        <div>
                            <span className="font-bold">Apellidos:</span>
                            <p className="bg-slate-200 p-2 mt-2">
                                {informe.paciente.apellidos}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-sm">
                        <div>
                            <span className="font-bold">
                                Identificación (Cédula):
                            </span>
                            <p className="bg-slate-200 p-2 mt-2">
                                {informe.paciente.cedula}
                            </p>
                        </div>
                        <div>
                            <span className="font-bold">
                                Fecha de Ingreso al Servicio:
                            </span>
                            <p className="bg-slate-200 p-2 mt-2">
                                {format(
                                    informe.paciente.created_at,
                                    "yyyy-MM-dd"
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-sm">
                        <div>
                            <span className="font-bold">Estado Civil:</span>
                            <p className="bg-slate-200 p-2 mt-2">
                                {informe.paciente.estado_civil}
                            </p>
                        </div>
                        <div>
                            <span className="font-bold">Ocupación:</span>
                            <p className="bg-slate-200 p-2 mt-2">
                                {informe.paciente.ocupacion}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-sm">
                        <div>
                            <span className="font-bold">Responsable:</span>
                            <p className="bg-slate-200 p-2 mt-2">
                                {informe.paciente.responsable.name}
                            </p>
                        </div>
                        <div>
                            <span className="font-bold">Teléfono:</span>
                            <p className="bg-slate-200 p-2 mt-2">
                                {informe.paciente.telefono}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-sm mb-4">
                        <div>
                            <span className="font-bold">
                                Fecha de Nacimiento:
                            </span>
                            <p className="bg-slate-200 p-2 mt-2">
                                {format(
                                    informe.paciente.fecha_nacimiento,
                                    "yyyy-MM-dd"
                                )}
                            </p>
                        </div>
                        <div>
                            <span className="font-bold">Edad:</span>
                            <p className="bg-slate-200 p-2 mt-2">
                                {informe.paciente.edad}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1  gap-6 mt-4 text-sm mb-4">
                        <div>
                            <span className="font-bold">
                                Motivo de Ingreso:
                            </span>
                            <p
                                className="border border-gray-400 border-dashed p-2 mt-2  text-xs"
                                dangerouslySetInnerHTML={{
                                    __html: informe.paciente.motivo_ingreso,
                                }}
                            ></p>
                        </div>
                    </div>

                    <FormTitleHeader title="Anamnesis" />

                    <div className="grid grid-cols-1  gap-6 mt-4 text-sm mb-4">
                        <div>
                            <span className="font-bold">
                                Antecedentes Patológicos:
                            </span>
                            <p
                                className="border border-gray-400 border-dashed p-2 mt-2  text-xs"
                                dangerouslySetInnerHTML={{
                                    __html: informe.paciente
                                        .antecedentes_patologicos,
                                }}
                            ></p>
                        </div>
                    </div>

                    <div className="overflow-x-auto  max-w-screen-xl mx-auto text-left uppercase text-black text-sm font-semibold mb-6">
                        Revision Aparatos y Sistemas
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-sm mb-4">
                        <div>
                            <span className="font-bold">
                                Aparato Circulatorio:
                            </span>
                            <p
                                className="border border-gray-400 border-dashed p-2 mt-2  text-xs"
                                dangerouslySetInnerHTML={{
                                    __html: informe.apa_sis_circulatorio,
                                }}
                            ></p>
                        </div>
                        <div>
                            <span className="font-bold">Sistema Nervioso:</span>
                            <p
                                className="border border-gray-400 border-dashed p-2 mt-2  text-xs"
                                dangerouslySetInnerHTML={{
                                    __html: informe.apa_sis_nervioso,
                                }}
                            ></p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-sm mb-4">
                        <div>
                            <span className="font-bold">
                                Sistema Endócrino:
                            </span>
                            <p
                                className="border border-gray-400 border-dashed p-2 mt-2  text-xs"
                                dangerouslySetInnerHTML={{
                                    __html: informe.apa_sis_endocrino,
                                }}
                            ></p>
                        </div>
                        <div>
                            <span className="font-bold">
                                Dieta y Nutrición:
                            </span>
                            <p
                                className="border border-gray-400 border-dashed p-2 mt-2  text-xs"
                                dangerouslySetInnerHTML={{
                                    __html: informe.dieta_nutricion,
                                }}
                            ></p>
                        </div>
                    </div>

                    <div className="overflow-x-auto  max-w-screen-xl mx-auto text-left uppercase text-black text-sm font-semibold mb-4 pb-2">
                        Exploración físico
                    </div>

                    <div className="grid grid-cols-1  gap-6 mt-4 text-sm mb-8">
                        <div>
                            <span className="font-bold">Presion Arterial:</span>
                            <p className="border border-gray-400 border-dashed p-2 mt-2  text-xs">
                                {informe.presion_arterial}
                            </p>
                        </div>
                    </div>

                    <FormTitleHeader title="Valoración en la esfera funcional, social y mental" />

                    <div className="grid grid-cols-1  gap-6 mt-4 text-sm mb-4">
                        <div>
                            <span className="font-bold">Esfera Funcional:</span>
                            <p className="border border-gray-400 border-dashed p-2 mt-2  text-xs">
                                {informe.esfera_funcional}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1  gap-6 mt-4 text-sm mb-4">
                        <div>
                            <span className="font-bold">Esfera Social:</span>
                            <p className="border border-gray-400 border-dashed p-2 mt-2  text-xs">
                                {informe.esfera_social}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1  gap-6 mt-4 text-sm mb-4">
                        <div>
                            <span className="font-bold">Esfera Mental:</span>
                            <p className="border border-gray-400 border-dashed p-2 mt-2  text-xs">
                                {informe.esfera_mental}
                            </p>
                        </div>
                    </div>

                    <FormTitleHeader title="Conclusión" />
                    <div className="grid grid-cols-1  gap-6 mt-4 text-sm mb-4">
                        <div>
                            <p
                                className="border border-gray-400 border-dashed p-2 mt-2  text-xs"
                                dangerouslySetInnerHTML={{
                                    __html: informe.conclusion,
                                }}
                            ></p>
                        </div>
                    </div>

                    <FormTitleHeader title="Recomendaciones" />
                    <div className="grid grid-cols-1  gap-6 mt-4 text-sm mb-4">
                        <div>
                            <p
                                className="border border-gray-400 border-dashed p-2 mt-2  text-xs"
                                dangerouslySetInnerHTML={{
                                    __html: informe.recomendaciones,
                                }}
                            ></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-19">
                <div className="overflow-x-auto bg-white p-4 max-w-screen-xl mx-auto">
                    <div className="flex justify-center">
                        <Link
                            href={route("informes-medicos.index")}
                            className="bg-gray-600 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-400 "
                        >
                            Cancelar
                        </Link>
                        <PrimaryButton className="ms-4" onClick={descargarPDF}>
                            Descargar
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
