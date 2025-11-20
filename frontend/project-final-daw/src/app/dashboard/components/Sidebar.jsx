"use client";
import { Users, ChartBarStacked, HandCoins, DoorOpen } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
    const { data: session } = useSession();

    console.log(session);
    const handleSignOut = (e) => {
        signOut();
    };

    return (
        <aside className="w-full min-h-screen sm:w-60 text-white font-light grid grid-rows-[90%_10%] gap-2">
            <nav className="bg-verdeAzuladoOscuroBase w-full rounded-2xl p-3">
                <h2 className="mb-4 text-xl flex flex-row gap-2">
                    App Gastos | <span>{session.user.name.split(" ")[0]}</span>
                </h2>
                <ul className="flex flex-col gap-2">
                    <li className="cursor-pointer flex flex-row gap-3 p-2 hover:bg-white hover:text-verdeAzuladoOscuroBase hover:rounded-xl">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>Usuarios</span>
                    </li>
                    <li className="cursor-pointer flex flex-row gap-3 p-2 hover:bg-white hover:text-verdeAzuladoOscuroBase hover:rounded-xl">
                        <ChartBarStacked className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>Categorias</span>
                    </li>
                    <li className="cursor-pointer flex flex-row gap-3 p-2 hover:bg-white hover:text-verdeAzuladoOscuroBase hover:rounded-xl">
                        <HandCoins className="w-4 h-4 sm:w-5 sm:h-5 stroke-current" />
                        <span>Gasto</span>
                    </li>
                </ul>
            </nav>
            <div className="flex flex-start mb-10 items-center bg-verdeAzuladoOscuroBase w-full h-full rounded-xl p-3">
                <button type="button" id="signOut" className="flex flex-row gap-3" onClick={handleSignOut}>
                    <DoorOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white"/>
                    Salir
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
