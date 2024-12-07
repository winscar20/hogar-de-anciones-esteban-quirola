import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CreateForm from "./Partials/CreateForm";
import { Head } from "@inertiajs/react";
const Create = () => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Crear Informe Médico
                </h2>
            }
        >
            <Head title="Informe Médico" />
            <CreateForm></CreateForm>
        </AuthenticatedLayout>
    );
};

export default Create;
