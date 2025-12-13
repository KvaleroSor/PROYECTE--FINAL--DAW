"use client";
import { useSession } from "next-auth/react";
import { useCategories } from "@/app/context/CategoryContext.js";
import { useState, useEffect } from "react";
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
} from "lucide-react";

const FormSpend = () => {
    const {
        isUpdatedPushed,
        isCategory,
        isCategoryName,
        isCategoryColor,
        setIsCategory,
        setIsCategoryName,
        setIsCategoryColor,
        setIsUpdatedPushed,
        createCategory,
        updatedCategory,
    } = useCategories();
    const [isSelectedIcon, setIsSelectedIcon] = useState(null);
    const { data: session } = useSession();
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

    useEffect(() => {
        if (isUpdatedPushed && isCategory) {
            setIsCategoryName(isCategory.name);
            setIsCategoryColor(isCategory.color);
            setIsSelectedIcon(isCategory.icon);
        }
    }, [isUpdatedPushed, isCategory]);

    const handleSubmitCategory = async (e) => {
        e.preventDefault();

        console.log("🔍 SESSION COMPLETE:", session);
        console.log("🔍 SESSION USER:", session?.user);
        console.log("🔍 USER ID:", session?.user?.user_id);

        const buttonPushed = e.nativeEvent.submitter.id;

        const data = {
            name: isCategoryName,
            color: isCategoryColor,
            icon: isSelectedIcon,
            user_id: session?.user?.user_id,
        };

        console.log("📤 DATA TO SEND:", data);

        if (!data.user_id) {
            console.error("❌ ERROR: No user_id disponible");
            alert("Error: Usuario no logueado o sesión no válida");
            return;
        }

        if (buttonPushed === "button-create") {                 
            try {
                // console.log(data);            
                const res = await createCategory(data, session);

                if (!res) {
                    console.log(`Algo mal ha pasado`);
                }

                console.log(res);
                resetForm();
            } catch (err) {
                console.error(err);
            }
        } else if (buttonPushed === "button-update") {            
            try {
                const res = await updatedCategory(isCategory._id, data, session);

                if (!res) {
                    console.log(`Algo mal ha pasado`);
                }

                console.log(res);
                setIsUpdatedPushed(false);
                resetForm();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const resetForm = () => {
        setIsCategoryName("");
        setIsCategoryColor("");
        setIsSelectedIcon(false);
    };

    return (
        <>
            <form
                className="flex flex-col justify-start items-center gap-3 text-slate-700"
                onSubmit={(e) => {
                    handleSubmitCategory(e);
                }}
            >
                <div className="w-full space-y-2 space-x-3 flex flex-row justify-start items-center">
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nombre Categoría"
                        className="h-12 w-full bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-slate-900 transition-colors rounded-lg p-2 focus:bg-slate-100 shadow-md"
                        onChange={(e) => {
                            setIsCategoryName(e.target.value || "");
                        }}
                        value={isCategoryName}
                    />
                </div>
                <div className="w-full flex flex-row justify-start items-center">
                    <label htmlFor="color">Color</label>
                    <input
                        id="color"
                        type="text"
                        placeholder="Color Categoría"
                        className="h-12 w-full bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:bg-white focus:border-slate-900 transition-colors rounded-lg p-2 focus:bg-slate-100 shadow-md ml-8"
                        onChange={(e) => {
                            setIsCategoryColor(e.target.value || "");
                        }}
                        value={isCategoryColor}
                    />
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mt-5 mb-5">
                    {availableIcons.map((icon) => {
                        const IconComponent = icon.icon;
                        const isActive = isSelectedIcon === icon.name;
                        return (
                            <button
                                key={icon.name}
                                type="button"
                                className={`w-14 h-14 aspect-square rounded-2xl border-2 transition-all duration-100 flex items-center justify-center group hover:scale-105 p-2 ${
                                    isActive
                                        ? "border-slate-900 bg-green-300/25 shadow-md"
                                        : "border-slate-300 hover:border-slate-900 bg-gray-100 hover:bg-white"
                                }`}
                                onClick={() =>
                                    setIsSelectedIcon((prev) =>
                                        prev === icon.name ? null : icon.name
                                    )
                                }
                            >
                                <IconComponent
                                    className={`w-7 h-7 transition-colors ${
                                        isSelectedIcon
                                            ? "text-slate-600"
                                            : "text-slate-600"
                                    }`}
                                />
                            </button>
                        );
                    })}
                </div>
                <div className="flex justify-center items-center w-full gap-3">
                    <button
                        id="button-create"
                        type="submit"
                        className="w-auto p-4 h-11 sm:h-12 flex justify-center items-center bg-white border-2 border-slate-300 hover:bg-slate-100 transition-all duration-300 rounded-xl group"
                    >
                        <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                        <span>Crear Categoría</span>
                    </button>
                    <button
                        id="button-update"
                        type="submit"
                        className="w-auto p-4 h-11 sm:h-12 flex justify-center items-center bg-white border-2 border-slate-300 hover:bg-slate-100 transition-all duration-300 rounded-xl group"
                    >
                        <Repeat className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                        <span>Actualizar Categoría</span>
                    </button>
                </div>
            </form>
        </>
    );
};

export default FormSpend;
