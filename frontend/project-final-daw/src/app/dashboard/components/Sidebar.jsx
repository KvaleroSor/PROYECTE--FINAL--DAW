"use client";
import {
    Users,
    ChartBarStacked,
    HandCoins,
    DoorOpen,
    ChartColumnIncreasing,
    Settings,
    House,
    ChevronRight,
    PiggyBank
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { BalanceLogoAlt } from "./../../../components/BalanceLogoAlt.jsx";
import { BalanceLogoCircle } from './../../../components/BalanceLogoCircle.jsx';

const Sidebar = () => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const isActiveRoute = (route) => pathname === route;

    if (status === "loading") return null;
    if (!session) return null;

    const handleSignOut = (e) => {
        signOut({ callbackUrl: "/" });
    };

    return (
        <aside className="hidden md:block w-60 h-auto sticky top-0 p-2">
            <nav className="w-full h-full bg-slate-800 border-2 shadow-md hover:shadow-xl rounded-2xl p-3 flex flex-col justify-between overflow-y-auto">
                <div className="text-slate-300">
                    <Link
                        href="/dashboard"
                        className="text-slate-300 flex justify-start ml-2 mb-8"
                    >
                        <div className="flex items-center gap-3">
                            <BalanceLogoCircle className="w-10 h-10" />
                            <span className="text-2xl">numoes.app</span>
                            {/* <span>{session.user.name.split(" ")[0]}</span> */}
                        </div>
                    </Link>
                    <Link
                        href="/dashboard"
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                            isActiveRoute("/dashboard")
                                ? "transition-all duration-300 group bg-slate-200 text-slate-800 hover:bg-slate-200 shadow-xl"
                                : "text-slate-300 hover:text-slate-300"
                        }`}
                    >
                        <House className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>Inicio</span>
                        {isActiveRoute("/dashboard") && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                    </Link>
                    <Link
                        href="/dashboard/category"
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                            isActiveRoute("/dashboard/category")
                                ? "transition-all duration-300 group bg-slate-200 text-slate-800 hover:bg-slate-200 shadow-xl"
                                : "text-slate-300 hover:text-slate-300"
                        }`}
                    >
                        <ChartBarStacked className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>Categorias</span>
                        {isActiveRoute("/dashboard/category") && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                    </Link>
                    <Link
                        href="/dashboard/saving"
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                            isActiveRoute("/dashboard/saving")
                                ? "transition-all duration-300 group bg-slate-200 text-slate-800 hover:bg-slate-200 shadow-xl"
                                : "text-slate-300 hover:text-slate-300"
                        }`}
                    >
                        <PiggyBank className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>Ahorro</span>
                        {isActiveRoute("/dashboard/saving") && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                    </Link>
                    <Link
                        href="/dashboard/spend"
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                            isActiveRoute("/dashboard/spend")
                                ? "transition-all duration-300 group bg-slate-200 text-slate-800 hover:bg-slate-200 shadow-xl"
                                : "text-slate-300 hover:text-slate-300"
                        }`}
                    >
                        <HandCoins className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>Gasto</span>
                        {isActiveRoute("/dashboard/spend") && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                    </Link>
                    <Link
                        href="/dashboard/inversion"
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                            isActiveRoute("/dashboard/inversion")
                                ? "transition-all duration-300 group bg-slate-200 text-slate-800 hover:bg-slate-200 shadow-xl"
                                : "text-slate-300 hover:text-slate-300"
                        }`}
                    >
                        <ChartColumnIncreasing className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>Invesión</span>
                        {isActiveRoute("/dashboard/inversion") && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                    </Link>
                    <Link
                        href="/dashboard/settings"
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                            isActiveRoute("/dashboard/settings")
                                ? "transition-all duration-300 group bg-slate-200 text-slate-800 hover:bg-slate-200 shadow-xl"
                                : "text-slate-300 hover:text-slate-300"
                        }`}
                    >
                        <Settings className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>Configuración</span>
                        {isActiveRoute("/dashboard/settings") && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                    </Link>
                </div>
                <button
                    type="button"
                    id="signOut"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-300 hover:text-red-600 hover:bg-slate-200 transition-all mt-4 bg-slate-800 border-t-2"
                    onClick={handleSignOut}
                >
                    <DoorOpen className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                    Cerrar Sesión
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
