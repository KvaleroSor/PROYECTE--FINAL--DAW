"use client";

import InversionSummary from "./components/InversionSummary";

export default function InversionPage() {
    return (
        <div className="w-full min-h-screen bg-white dark:bg-slate-900 py-8 transition-colors duration-300">
            <div className="w-full px-2 sm:px-4 lg:px-4">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-md transition-all duration-300">
                    <div className="mb-6">
                        <h1 className="text-3xl text-gray-900 dark:text-slate-100 mb-2">Inversiones</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">Gestiona y monitorea tus inversiones</p>
                    </div>
                    <InversionSummary />
                </div>
            </div>
        </div>
    );
}
