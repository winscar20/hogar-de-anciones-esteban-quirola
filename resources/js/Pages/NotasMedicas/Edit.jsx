import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import EditForm from "./Partials/EditForm";
import { Head } from "@inertiajs/react";
const Edit = ({ nota }) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Editar Nota Médica
                </h2>
            }
        >
            <Head title="Edición de Nota Médica" />
            {/*  */}
            <EditForm nota={nota}></EditForm>
        </AuthenticatedLayout>
    );
};

export default Edit;
