"use client";

import { useSaving } from "@/app/context/SavingContext.js";
import GridSavingGoals from "./components/GridSavingGoals.jsx";
import FormSavingGoal from "./components/FormSavingGoal.jsx";
import ContributionHistoryChart from "./components/ContributionHistoryChart.jsx";

const SavingGoalsPage = () => {
    const { isFormSavingOpen } = useSaving();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">
                        Metas de Ahorro
                    </h1>
                    <p className="text-gray-600 dark:text-slate-400">
                        Gestiona tus objetivos financieros y alcanza tus metas
                    </p>
                </div>

                {/* Modal del formulario */}
                {isFormSavingOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-white dark:bg-slate-800 p-6 m-4">
                            <FormSavingGoal />
                        </div>
                    </div>
                )}

                {/* Grid de metas */}
                <GridSavingGoals />

                {/* Historial de contribuciones */}
                <div className="mt-8">
                    <ContributionHistoryChart />
                </div>
            </div>
        </div>
    );
};

export default SavingGoalsPage;
