"use client";
import { useState } from "react";
import {
    Users,
    ChartBarStacked,
    HandCoins,
    DoorOpen,
    ChartColumnIncreasing,
    Settings,
    House,
    ChevronRight,
    PiggyBank,
    Menu,
    X
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { BalanceLogoCircle } from "@/components/BalanceLogoCircle.jsx";

const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, status } = useSession();
    const t = useTranslations("navigation");
    const tAuth = useTranslations("auth");
    const pathname = usePathname();
    const isActiveRoute = (route) => pathname === route;

    if (status === "loading") return null;
    if (!session) return null;

    const handleSignOut = (e) => {
        signOut({ callbackUrl: "/" });
    };

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            {/* Botón hamburguesa */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-lg shadow-lg"
                aria-label="Toggle menu"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={closeMenu}
                />
            )}

            {/* Sidebar móvil */}
            <aside
                className={`md:hidden fixed top-0 left-0 h-screen w-64 bg-slate-800 z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <nav className="w-full h-full p-3 flex flex-col justify-between overflow-y-auto">
                    <div className="text-slate-300">
                        <Link
                            href="/dashboard"
                            className="text-slate-300 flex justify-start ml-2 mb-8 mt-4"
                            onClick={closeMenu}
                        >
                            <div className="flex items-center gap-3">
                                <BalanceLogoCircle className="w-10 h-10" />
                                <span className="text-2xl">numoes.app</span>
                            </div>
                        </Link>
                        <Link
                            href="/dashboard"
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                                isActiveRoute("/dashboard")
                                    ? "bg-slate-200 text-slate-800 shadow-xl"
                                    : "text-slate-300"
                            }`}
                            onClick={closeMenu}
                        >
                            <House className="w-5 h-5 stroke-current" />
                            <span>{t("dashboard")}</span>
                            {isActiveRoute("/dashboard") && (
                                <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
                        </Link>
                        <Link
                            href="/dashboard/category"
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                                isActiveRoute("/dashboard/category")
                                    ? "bg-slate-200 text-slate-800 shadow-xl"
                                    : "text-slate-300"
                            }`}
                            onClick={closeMenu}
                        >
                            <ChartBarStacked className="w-5 h-5 stroke-current" />
                            <span>{t("categories")}</span>
                            {isActiveRoute("/dashboard/category") && (
                                <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
                        </Link>
                        <Link
                            href="/dashboard/saving"
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                                isActiveRoute("/dashboard/saving")
                                    ? "bg-slate-200 text-slate-800 shadow-xl"
                                    : "text-slate-300"
                            }`}
                            onClick={closeMenu}
                        >
                            <PiggyBank className="w-5 h-5 stroke-current" />
                            <span>{t("savings")}</span>
                            {isActiveRoute("/dashboard/saving") && (
                                <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
                        </Link>
                        <Link
                            href="/dashboard/spend"
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                                isActiveRoute("/dashboard/spend")
                                    ? "bg-slate-200 text-slate-800 shadow-xl"
                                    : "text-slate-300"
                            }`}
                            onClick={closeMenu}
                        >
                            <HandCoins className="w-5 h-5 stroke-current" />
                            <span>{t("expenses")}</span>
                            {isActiveRoute("/dashboard/spend") && (
                                <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
                        </Link>
                        <Link
                            href="/dashboard/inversion"
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                                isActiveRoute("/dashboard/inversion")
                                    ? "bg-slate-200 text-slate-800 shadow-xl"
                                    : "text-slate-300"
                            }`}
                            onClick={closeMenu}
                        >
                            <ChartColumnIncreasing className="w-5 h-5 stroke-current" />
                            <span>{t("investments")}</span>
                            {isActiveRoute("/dashboard/inversion") && (
                                <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
                        </Link>
                        <Link
                            href="/dashboard/settings"
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                                isActiveRoute("/dashboard/settings")
                                    ? "bg-slate-200 text-slate-800 shadow-xl"
                                    : "text-slate-300"
                            }`}
                            onClick={closeMenu}
                        >
                            <Settings className="w-5 h-5 stroke-current" />
                            <span>{t("settings")}</span>
                            {isActiveRoute("/dashboard/settings") && (
                                <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
                        </Link>
                    </div>
                    <button
                        type="button"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-300 hover:text-red-600 hover:bg-slate-200 transition-all mt-4 bg-slate-800 border-t-2"
                        onClick={handleSignOut}
                    >
                        <DoorOpen className="w-5 h-5 stroke-current" />
                        {tAuth("logout")}
                    </button>
                </nav>
            </aside>
        </>
    );
};

export default MobileSidebar;
