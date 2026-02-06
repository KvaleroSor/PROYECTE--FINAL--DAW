"use client";

import { useSaving } from "@/app/context/SavingContext.js";
import GridSavingGoals from "./components/GridSavingGoals.jsx";
import FormSavingGoal from "./components/FormSavingGoal.jsx";
import ContributionHistoryChart from "./components/ContributionHistoryChart.jsx";

const SavingGoalsPage = () => {
    const { isFormSavingOpen } = useSaving();

    return (
        <div className="w-full min-h-screen bg-white dark:bg-slate-900 py-8 transition-colors duration-300">

            {/* Modal: FULL SCREEN, no limitado */}
            {isFormSavingOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-white dark:bg-slate-800 p-6 m-4">
                        <FormSavingGoal />
                    </div>
                </div>
            )}

            {/* Grid de metas — FULL WIDTH */}
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <GridSavingGoals />
            </div>

            {/* Gráfica — centrada y contenida */}
            <section className="w-full px-4 sm:px-6 lg:px-8 mt-8">
                <ContributionHistoryChart />
            </section>

        </div>
    );
};

export default SavingGoalsPage;
