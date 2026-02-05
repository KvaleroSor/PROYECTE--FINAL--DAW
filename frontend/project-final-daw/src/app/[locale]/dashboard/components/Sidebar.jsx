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
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
// import { BalanceLogoAlt } from "@/components/BalanceLogoAlt.jsx";
import { BalanceLogoCircle } from "@/components/BalanceLogoCircle.jsx";

const Sidebar = () => {
    const { data: session, status } = useSession();
    const t = useTranslations("navigation");
    const tAuth = useTranslations("auth");
    const pathname = usePathname();
    const router = useRouter();
    // Ahora pathname ya no incluye el locale, así que la comparación funciona directamente
    const isActiveRoute = (route) => pathname === route;

    if (status === "loading") return null;
    if (!session) return null;

    const handleSignOut = async (e) => {
        await signOut({ redirect: false });
        router.push("/");
    };

    return (
        <aside className="hidden md:block w-60 h-screen fixed top-0 left-0 p-2 z-40">
            <nav className="w-full h-full bg-slate-800 shadow-2xl hover:shadow-md transition-all duration-300 rounded-2xl p-3 flex flex-col justify-between overflow-y-auto">
                <div className="text-slate-300">
                    <Link
                        href="/dashboard"
                        className="text-slate-300 dark:text-slate-100 flex justify-start ml-2 mb-8"
                    >
                        <div className="flex items-center gap-3">
                            <BalanceLogoCircle className="w-10 h-10" />
                            <span className="text-2xl">numoes.app</span>
                            {/* <span>{session.user.name.split(" ")[0]}</span> */}
                        </div>
                    </Link>
                    <Link
                        href="/dashboard"
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActiveRoute("/dashboard")
                            ? "transition-all duration-300 group bg-slate-200 text-slate-800 hover:bg-slate-200 shadow-xl"
                            : "text-slate-300 hover:text-slate-300"
                            }`}
                    >
                        <House className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>{t("dashboard")}</span>
                        {isActiveRoute("/dashboard") && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                    </Link>
                    <Link
                        href="/dashboard/category"
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActiveRoute("/dashboard/category")
                            ? "transition-all duration-300 group bg-slate-200 text-slate-800 hover:bg-slate-200 shadow-xl"
                            : "text-slate-300 hover:text-slate-300"
                            }`}
                    >
                        <ChartBarStacked className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>{t("categories")}</span>
                        {isActiveRoute("/dashboard/category") && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                    </Link>
                    <Link
                        href="/dashboard/saving"
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActiveRoute("/dashboard/saving")
                            ? "transition-all duration-300 group bg-slate-200 text-slate-800 hover:bg-slate-200 shadow-xl"
                            : "text-slate-300 hover:text-slate-300"
                            }`}
                    >
                        <PiggyBank className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>{t("savings")}</span>
                        {isActiveRoute("/dashboard/saving") && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                    </Link>
                    <Link
                        href="/dashboard/spend"
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActiveRoute("/dashboard/spend")
                            ? "transition-all duration-300 group bg-slate-200 text-slate-800 hover:bg-slate-200 shadow-xl"
                            : "text-slate-300 hover:text-slate-300"
                            }`}
                    >
                        <HandCoins className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>{t("expenses")}</span>
                        {isActiveRoute("/dashboard/spend") && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                    </Link>
                    <Link
                        href="/dashboard/inversion"
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActiveRoute("/dashboard/inversion")
                            ? "transition-all duration-300 group bg-slate-200 text-slate-800 hover:bg-slate-200 shadow-xl"
                            : "text-slate-300 hover:text-slate-300"
                            }`}
                    >
                        <ChartColumnIncreasing className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>{t("investments")}</span>
                        {isActiveRoute("/dashboard/inversion") && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                    </Link>
                    <Link
                        href="/dashboard/settings"
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActiveRoute("/dashboard/settings")
                            ? "transition-all duration-300 group bg-slate-200 text-slate-800 hover:bg-slate-200 shadow-xl"
                            : "text-slate-300 hover:text-slate-300"
                            }`}
                    >
                        <Settings className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>{t("settings")}</span>
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
                    {tAuth("logout")}
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
