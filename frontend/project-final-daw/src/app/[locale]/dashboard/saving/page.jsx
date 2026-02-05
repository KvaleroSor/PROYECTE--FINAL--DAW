"use client";

import { useSaving } from "@/app/context/SavingContext.js";
import GridSavingGoals from "./components/GridSavingGoals.jsx";
import FormSavingGoal from "./components/FormSavingGoal.jsx";
import ContributionHistoryChart from "./components/ContributionHistoryChart.jsx";

const SavingGoalsPage = () => {
    const { isFormSavingOpen } = useSaving();

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
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
