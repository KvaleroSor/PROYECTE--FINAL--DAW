"use client";
import {
    Users,
    ChartBarStacked,
    HandCoins,
    DoorOpen,
    ChartColumnIncreasing,
    Settings,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
    const { data: session } = useSession();

    console.log(session);
    const handleSignOut = (e) => {
        signOut();
    };

    return (
        <aside className="w-full h-screen sm:w-60 text-white font-light grid grid-rows-[1fr_auto] gap-6 mt-2 opacity-75%">
            <nav className="bg-verdeAzulado-medium w-full rounded-2xl p-3 mb-2">
                <Link href="/dashboard">
                    <h2 className="mb-4 text-xl flex flex-row gap-2">
                        App Gastos |{" "}
                        <span>{session.user.name.split(" ")[0]}</span>
                    </h2>
                </Link>
                <ul className="flex flex-col gap-2">
                    <li className="cursor-pointer flex flex-row gap-3 p-2 hover:bg-white hover:text-verdeAzulado-medium hover:rounded-xl">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>Usuarios</span>
                    </li>
                    <li className="cursor-pointer flex flex-row gap-3 p-2 hover:bg-white hover:text-verdeAzulado-medium hover:rounded-xl">
                        <ChartBarStacked className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>Categorias</span>
                    </li>
                    <li className="cursor-pointer flex flex-row gap-3 p-2 hover:bg-white hover:text-verdeAzulado-medium hover:rounded-xl">
                        <HandCoins className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>Gasto</span>
                    </li>
                    <li className="cursor-pointer flex flex-row gap-3 p-2 hover:bg-white hover:text-verdeAzulado-medium hover:rounded-xl">
                        <Link
                            href="/dashboard/inversion"
                            className="flex gap-3 items-center"
                        >
                            <ChartColumnIncreasing className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                            <span>Invesión</span>
                        </Link>
                    </li>
                    <li className="cursor-pointer flex flex-row gap-3 p-2 hover:bg-white hover:text-verdeAzulado-medium hover:rounded-xl">
                        <Settings className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>Configuración</span>
                    </li>
                </ul>
            </nav>
            <div className="flex flex-start mb-3 h-[90px] items-center bg-verdeAzulado-medium w-full h-auto rounded-xl p-3">
                <button
                    type="button"
                    id="signOut"
                    className="flex flex-row gap-3"
                    onClick={handleSignOut}
                >
                    <DoorOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
