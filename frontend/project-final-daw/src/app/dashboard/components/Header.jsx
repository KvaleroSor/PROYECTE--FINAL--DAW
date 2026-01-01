"use client";

import { Search, Plus, Bell } from "lucide-react";
import { useCategories } from "@/app/context/CategoryContext.js";
import { useSpends } from '@/app/context/SpendContext.js';
import { useSession } from "next-auth/react";

const Header = () => {
    const { data: session, status } = useSession();
    const { setIsFormCategoryOpen } = useCategories();
    const { setIsFormSpendOpen } = useSpends();

    const handleClickButtonFormCategory = () => {
        setIsFormCategoryOpen(true);
    };

    const handleClickButtonFormSpend = () => {
        setIsFormSpendOpen(true);
    }

    return (
        <>
            <header className="flex justify-center items-center m-2 bg-white">
                <div className="border-2 w-full h-full flex flex-row justify-center items-center rounded-xl">
                    <div className="w-full ml-4">
                        {/* <button className="flex w-fit items-center gap-2 h-10 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 hover:from-indigo-200 to-purple-200"
                                onClick={handleClickButtonFormSpend}
                        >
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            <span>Añadir Gasto</span>
                        </button> */}
                        <h1 className="text-2xl sm:text-3xl text-slate-900">Dashboard Financiero</h1>
                        <p className="text-sm text-slate-600">Gestiona tus finanzas de forma inteligente</p>
                    </div>
                    <div className="w-full flex justify-end items-center gap-6 mr-4">
                        <Search className="w-5 h-5 text-gray-700" />
                        <Bell className="w-5 h-5 text-gray-700" />
                        {/* <button
                            className="flex items-center gap-2 h-10 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 hover:from-indigo-200 to-purple-200"
                            onClick={handleClickButtonFormCategory}
                        >
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            <span>Crear Categoria</span>
                        </button> */}
                        <div className="flex flex-col border-l border-slate-500 pl-3">                            
                            <h1>{session?.user?.name}</h1>
                            <p>{session?.user?.email}</p>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
