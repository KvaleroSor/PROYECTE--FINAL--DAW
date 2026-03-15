"use client";

import { X, AlertTriangle, Trash2 } from "lucide-react";

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirmar Acción",
    message = "¿Estás seguro de que quieres realizar esta acción?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    type = "danger", // danger, warning, info
    isLoading = false,
    itemDetails = null,
}) => {
    if (!isOpen) return null;

    const typeStyles = {
        danger: {
            iconBg: "bg-red-100 dark:bg-red-900/30",
            iconColor: "text-red-600 dark:text-red-400",
            confirmBg: "bg-red-600 hover:bg-red-700",
            Icon: Trash2,
        },
        warning: {
            iconBg: "bg-orange-100 dark:bg-orange-900/30",
            iconColor: "text-orange-600 dark:text-orange-400",
            confirmBg: "bg-orange-600 hover:bg-orange-700",
            Icon: AlertTriangle,
        },
        info: {
            iconBg: "bg-blue-100 dark:bg-blue-900/30",
            iconColor: "text-blue-600 dark:text-blue-400",
            confirmBg: "bg-blue-600 hover:bg-blue-700",
            Icon: X,
        },
    };

    const style = typeStyles[type];
    const Icon = style.Icon;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl border-2 border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 ${style.iconBg} rounded-full flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${style.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {title}
                    </h3>
                </div>

                {/* Content */}
                <div className="mb-6">
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                        {message}
                    </p>

                    {/* Item Details */}
                    {itemDetails && (
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-2">
                            {Object.entries(itemDetails).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">{key}:</span>
                                    <span className="font-medium text-slate-900 dark:text-slate-100">
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Warning message for deletions */}
                    {type === "danger" && (
                        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-sm text-red-800 dark:text-red-300">
                                ⚠️ Esta acción no se puede deshacer.
                            </p>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`flex-1 px-4 py-2.5 ${style.confirmBg} text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                Procesando...
                            </>
                        ) : (
                            <>
                                <Icon className="w-4 h-4" />
                                {confirmText}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
