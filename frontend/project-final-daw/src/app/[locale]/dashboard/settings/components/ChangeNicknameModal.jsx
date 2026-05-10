"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { X, User, Check, AlertCircle } from "lucide-react";
import changeNickname from "@/services/users/changeNickname";

const ChangeNicknameModal = ({ isOpen, onClose }) => {
    const { data: session, update } = useSession();
    const t = useTranslations("settings");
    const tCommon = useTranslations("common");

    const [newName, setNewName] = useState(session?.user?.name || "");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const validateName = () => {
        if (!newName || newName.trim() === "") {
            setError(t("nameRequired"));
            return false;
        }

        if (newName.trim().length < 2) {
            setError(t("nameMinLength"));
            return false;
        }

        if (newName.trim().length > 50) {
            setError(t("nameMaxLength"));
            return false;
        }

        if (newName.trim() === session?.user?.name) {
            setError(t("nameSameAsCurrent"));
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!validateName()) {
            return;
        }

        setIsLoading(true);

        try {
            const result = await changeNickname(newName.trim(), session?.accessToken);
            
            // Actualizar la sesión con el nuevo nombre
            await update({
                ...session,
                user: {
                    ...session?.user,
                    name: result.data.name,
                },
            });

            setSuccess(true);

            // Cerrar modal después de 2 segundos
            setTimeout(() => {
                onClose();
                setSuccess(false);
            }, 2000);
        } catch (err) {
            setError(err.message || t("nicknameChangeError"));
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setNewName(session?.user?.name || "");
        setError("");
        setSuccess(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            {t("changeNickname")}
                        </h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <p className="text-sm text-green-800 dark:text-green-300">
                            {t("nicknameChangedSuccess")}
                        </p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Current Name Display */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {t("currentName")}
                        </label>
                        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-400">
                            {session?.user?.name}
                        </div>
                    </div>

                    {/* New Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {t("newName")}
                        </label>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-slate-100"
                            placeholder={t("enterNewName")}
                            disabled={isLoading || success}
                            maxLength={50}
                        />
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {t("nameRequirements")}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {tCommon("cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || success}
                            className="flex-1 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    {t("changing")}
                                </>
                            ) : (
                                <>
                                    <User className="w-4 h-4" />
                                    {t("changeNickname")}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeNicknameModal;
