'use client';

import { Search, Plus, Bell } from "lucide-react";
import { useCategories } from "@/app/context/CategoryContext.js";

const Header = () => {
    const { setIsFormOpen } = useCategories();

    const handleClickButton = () => {
        setIsFormOpen(true);        
    };

    return (
        <>
            <header className="flex justify-center items-center m-2">
                <div className="border-2 w-full h-full flex flex-row justify-center items-center rounded-xl">
                    <div className="w-full flex justify-end items-center gap-6 mr-4">
                        <Search className="w-5 h-5 text-gray-700" />
                        <Bell className="w-5 h-5 text-gray-700" />
                        <button
                            className="flex items-center gap-2 h-10 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 hover:from-indigo-200 to-purple-200"
                            onClick={handleClickButton}
                        >
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            <span>Crear Categoria</span>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
