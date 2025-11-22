"use client";
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
    // const [isName, setIsName] = useState("");
    // const [isColor, setisColor] = useState("");
    // const [isActive, setisActive] = useState("");

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
    }, [isUpdatedPushed]);

    const handleSubmitCategory = async (e) => {
        e.preventDefault();

        const buttonPushed = e.nativeEvent.submitter.id;

        const data = {
            name: isCategoryName,
            color: isCategoryColor,
            icon: isSelectedIcon,
        };

        if (buttonPushed === "button-create") {
            console.log("Hola button_create");

            try {
                const res = await createCategory(data);

                if (!res) {
                    console.log(`Algo mal ha pasado`);
                }

                console.log(res);
                resetForm();
            } catch (err) {
                console.error(err);
            }
        } else if (buttonPushed === "button-update") {
            console.log("Hola button_update");
            try {
                const res = await updatedCategory(isCategory._id, data);

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
                className="flex flex-col justify-start items-center gap-3 text-[#1A8B84]"
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
                        className="h-12 w-full bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-[#1A8B84] transition-colors rounded-lg p-2 focus:bg-gradient-to-br from-[#1A8B84]/10 to-[#00C7C7]/10 shadow-md"
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
                        className="h-12 w-full bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-[#1A8B84] transition-colors rounded-lg p-2 focus:bg-gradient-to-br from-[#1A8B84]/10 to-[#00C7C7]/10 shadow-md ml-8"
                        onChange={(e) => {
                            setIsCategoryColor(e.target.value || "");
                        }}
                        value={isCategoryColor}
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
                <div className="flex justify-center items-center w-full gap-3">
                    <button
                        id="button-create"
                        type="submit"
                        className="w-auto p-4 rounded-lg mt-3 flex items-center h-12 bg-gradient-to-r from-[#19625C] via-[#1A8B84] to-[#00C7C7] hover:from-[#145047] hover:via-[#156F69] hover:to-[#00B0B0] text-white transition-all duration-300 group shadow-lg shadow-[#1A8B84]/20"
                    >
                        <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                        <span>Crear Categoría</span>
                    </button>
                    <button
                        id="button-update"
                        type="submit"
                        className="w-auto p-4 rounded-lg mt-3 flex items-center h-12 bg-gradient-to-r from-[#19625C] via-[#1A8B84] to-[#00C7C7] hover:from-[#145047] hover:via-[#156F69] hover:to-[#00B0B0] text-white transition-all duration-300 group shadow-lg shadow-[#1A8B84]/20"
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
