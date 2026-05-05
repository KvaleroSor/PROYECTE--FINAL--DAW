"use client";

import InversionSummary from "./components/InversionSummary";

export default function InversionPage() {
    return (
        <div className="w-full min-h-screen bg-white dark:bg-slate-900 py-8 transition-colors duration-300">
            <div className="w-full px-2 sm:px-4 lg:px-4">
                {/* <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-md transition-all duration-300"> */}
                <InversionSummary />
                {/* </div> */}
            </div>
        </div>
    );
}
