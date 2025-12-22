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
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const isActiveRoute = (route) => pathname === route;

    if (status === "loading") return null;
    if (!session) return null;

    const handleSignOut = (e) => {
        signOut({ callbackUrl: "/"});
        
    };

    return (
        <aside className="w-full h-screen sm:w-60 font-light grid grid-rows-[1fr_auto] gap-6 mt-2">
            <nav className="w-full h-auto bg-background-slate border-2 shadow-md hover:shadow-xl rounded-2xl p-3 mb-2">
                <Link href="/dashboard">
                    <h2 className="mb-4 text-xl flex flex-row gap-2">
                        App Gastos |{" "}
                        <span>{session.user.name.split(" ")[0]}</span>
                    </h2>
                </Link>

                <Link
                    href="/dashboard"
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                        isActiveRoute("/dashboard")
                            ? "transition-all duration-300 group bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 hover:from-indigo-200 to-purple-200  shadow-xl"
                            : "text-slate-700 hover:text-slate-900"
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
                            ? "transition-all duration-300 group bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 hover:from-indigo-200 to-purple-200 shadow-xl"
                            : "text-slate-700 hover:text-slate-900"
                    }`}
                >
                    <ChartBarStacked className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                    <span>Categorias</span>
                    {isActiveRoute("/dashboard/category") && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                </Link>

                <Link
                    href="/dashboard/spend"
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                        isActiveRoute("/dashboard/spend")
                            ? "transition-all duration-300 group bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 hover:from-indigo-200 to-purple-200 shadow-xl"
                            : "text-slate-700 hover:text-slate-900"
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
                            ? "transition-all duration-300 group bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 hover:from-indigo-200 to-purple-200 shadow-xl"
                            : "text-slate-700 hover:text-slate-900"
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
                            ? "transition-all duration-300 group bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 hover:from-indigo-200 to-purple-200 shadow-xl"
                            : "text-slate-700 hover:text-slate-900"
                    }`}
                >
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                    <span>Configuración</span>
                    {isActiveRoute("/dashboard/settings") && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                </Link>
            </nav>
            <div
                className="w-full flex flex-start mb-3 h-[90px] items-center rounded-xl p-3 bg-background-slate border-2 shadow-md hover:shadow-xl cursor-pointer"
                onClick={handleSignOut}
            >
                <button
                    type="button"
                    id="signOut"
                    className="flex flex-row gap-3"
                >
                    <DoorOpen className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
