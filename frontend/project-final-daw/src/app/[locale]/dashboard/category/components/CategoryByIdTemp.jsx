"use client";
import { useCategories } from "@/app/context/CategoryContext.js";
import { toRGBA } from "@/app/functions/toRGBA.js";
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
    Repeat,
    Icon,
    MoreVertical,
    CircleX,
} from "lucide-react";

const CategoryByIdTemp = () => {
    const { isCategory } = useCategories();

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
    const iconCategory = availableIcons.find((i) => i.name === isCategory.icon);
    const Icono = iconCategory?.icon || Plus;

    return (
        <div className="flex flex-col justify-center items-center gap-10">
            <h1 className="text-4xl">CATEGORÍAS POR ID</h1>
            {!isCategory || !isCategory.color ? (
                <p className="text-gray-400 italic">
                    Selecciona una categoria…
                </p>
            ) : (
                <div className="w-[500px] group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer">
                    <div className="flex items-start justify-between mb-4 group-hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border-2`}
                                style={{
                                    backgroundColor: toRGBA(
                                        isCategory.color,
                                        0.25
                                    ),
                                    border: `2px solid ${toRGBA(
                                        isCategory.color,
                                        0.6
                                    )}`,
                                }}
                            >
                                {Icono && (
                                    <Icono className="w-7 h-7 text-gray-700" />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-gray-700">
                                    {isCategory.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {isCategory.color}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryByIdTemp;
