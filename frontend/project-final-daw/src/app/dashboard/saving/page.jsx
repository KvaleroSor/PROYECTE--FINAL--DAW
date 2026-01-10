"use client";

import { useSaving } from "@/app/context/SavingContext.js";
import GridSavingGoals from "./components/GridSavingGoals.jsx";
import FormSavingGoal from "./components/FormSavingGoal.jsx";

const SavingGoalsPage = () => {
    const { isFormSavingOpen } = useSaving();

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Metas de Ahorro
                    </h1>
                    <p className="text-gray-600">
                        Gestiona tus objetivos financieros y alcanza tus metas
                    </p>
                </div>

                {/* Modal del formulario */}
                {isFormSavingOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 m-4">
                            <FormSavingGoal />
                        </div>
                    </div>
                )}

                {/* Grid de metas */}
                <GridSavingGoals />
            </div>
        </div>
    );
};

export default SavingGoalsPage;
