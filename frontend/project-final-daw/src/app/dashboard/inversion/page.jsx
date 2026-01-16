"use client";

import InversionSummary from "./components/InversionSummary";

export default function InversionPage() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-900">Inversiones</h1>
                <p className="text-slate-500 mt-2">Gestiona y monitorea tus inversiones</p>
            </div>
            <InversionSummary />
        </div>
    );
}
