"use client";

import { useState } from "react";
import {
    Plus,
    ShoppingCart,
    Home,
    Car,
    Utensils,
    Heart,
    Smartphone,
    Palette,
    X,
} from "lucide-react";

const FormSpend = () => {
    const [isSelectedIcon, setIsSelectedIcon] = useState(false);
    const [isActive, setisActive] = useState("");
    const availableIcons = [
        { icon: ShoppingCart, name: "ShoppingCart" },
        { icon: Home, name: "Home" },
        { icon: Car, name: "Car" },
        { icon: Utensils, name: "Utensils" },
        { icon: Heart, name: "Heart" },
        { icon: Smartphone, name: "Smartphone" },
        { icon: Palette, name: "Palette" },
        { icon: Plus, name: "Plus" },
    ];

    const handleSubmitCategory = async () => {
        
    };

    return (
        <>
            <form
                className="flex flex-col justify-start items-center gap-3 text-[#1A8B84]"
                onSubmit={handleSubmitCategory}
            >
                <div className="w-full space-y-2 space-x-3 flex flex-row justify-start items-center">
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nombre Categoria"
                        className="h-12 w-full bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-[#1A8B84] transition-colors rounded-lg p-2 focus:bg-gradient-to-br from-[#1A8B84]/10 to-[#00C7C7]/10 shadow-md"
                    />
                </div>
                <div className="w-full flex flex-row justify-start items-center">
                    <label htmlFor="name">Color</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nombre Categoria"
                        className="h-12 w-full bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-[#1A8B84] transition-colors rounded-lg p-2 focus:bg-gradient-to-br from-[#1A8B84]/10 to-[#00C7C7]/10 shadow-md ml-8"
                    />
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mt-5">
                    {availableIcons.map((icon) => {
                        const IconComponent = icon.icon;
                        const isActive = isSelectedIcon === icon.name;
                        return (
                            <button
                                key={icon.name}
                                type="button"
                                className={`w-full aspect-square rounded-lg border-2 transition-all duration-300 flex items-center justify-center group hover:scale-105 p-2 ${
                                    isActive
                                        ? "border-[#1A8B84] bg-gradient-to-br from-[#1A8B84]/10 to-[#00C7C7]/10 shadow-md"
                                        : "border-gray-200 hover:border-[#1A8B84]/50 bg-gray-50 hover:bg-white"
                                }`}
                                onClick={() =>
                                    setIsSelectedIcon((prev) =>
                                        prev === icon.name ? null : icon.name
                                    )
                                }
                            >
                                <IconComponent
                                    className={`w-6 h-6 transition-colors ${
                                        isSelectedIcon
                                            ? "text-[#1A8B84]"
                                            : "group-hover:text-[#1A8B84]"
                                    }`}
                                />
                            </button>
                        );
                    })}
                </div>
                <div className="flex justify-center items-center w-full">
                    <button
                        type="submit"
                        className="w-auto p-4 rounded-lg mt-3 flex items-center h-12 bg-gradient-to-r from-[#19625C] via-[#1A8B84] to-[#00C7C7] hover:from-[#145047] hover:via-[#156F69] hover:to-[#00B0B0] text-white transition-all duration-300 group shadow-lg shadow-[#1A8B84]/20"
                    >
                        <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                        <span>Crear Categoría</span>
                    </button>
                </div>
            </form>
        </>
    );
};

export default FormSpend;
