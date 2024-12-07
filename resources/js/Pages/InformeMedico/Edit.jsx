import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import EditForm from "./Partials/EditForm";
import { Head } from "@inertiajs/react";
const Edit = ({ informe }) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Editar Informe Médico
                </h2>
            }
        >
            <Head title="Edición de Informe Médico" />
            {/*  */}
            <EditForm informe={informe}></EditForm>
        </AuthenticatedLayout>
    );
};

export default Edit;
