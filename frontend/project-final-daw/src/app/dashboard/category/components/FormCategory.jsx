"use client";
import { useSession } from "next-auth/react";
import { useCategories } from "@/app/context/CategoryContext.js";
import { useState, useEffect } from "react";
import CardColor from "./CardColor.jsx";
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
    SquareX,
    CircleX,
    TrendingUp,
    PiggyBank,
    ReceiptEuro,
    TicketsPlane,
    Ban,
} from "lucide-react";

const FormCategory = () => {
    const {
        isUpdatedPushed,
        isCategory,
        isCategoryName,
        isCategoryColor,
        isMonthlyBudget,
        setIsCategory,
        setIsCategoryName,
        setIsCategoryColor,
        setIsUpdatedPushed,
        createCategory,
        updatedCategory,
        setIsFormOpen,
        setIsMonthlyBudget,
    } = useCategories();
    const [isSelectedIcon, setIsSelectedIcon] = useState(null);
    const { data: session } = useSession();

    const resetForm = () => {
        setIsCategoryName("");
        setIsMonthlyBudget(0);
        setIsCategoryColor("");
        setIsSelectedIcon(null);
        setIsUpdatedPushed(false);
        setIsCategory({});
    };

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
    const availableColors = [
        { id: "indigo", colorRef: "#6366F1" },
        { id: "violet", colorRef: "#7C3AED" },
        { id: "purple", colorRef: "#8B5CF6" },
        { id: "fuchsia", colorRef: "#D946EF" },
        { id: "pink", colorRef: "#EC4899" },
        { id: "rose", colorRef: "#F43F5E" },
        { id: "red", colorRef: "#EF4444" }, // Corregido
        { id: "orange", colorRef: "#F97316" },
        { id: "amber", colorRef: "#F59E0B" },
        { id: "yellow", colorRef: "#EAB308" },
        { id: "lime", colorRef: "#84CC16" },
        { id: "emerald", colorRef: "#10B981" },
        { id: "teal", colorRef: "#14B8A6" },
        { id: "cyan", colorRef: "#06B6D4" },
        { id: "sky", colorRef: "#0EA5E9" },
    ];

    useEffect(() => {
        if (isUpdatedPushed && isCategory) {
            setIsCategoryName(isCategory.name);
            setIsMonthlyBudget(isCategory.monthly_budget);
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
            monthly_budget: isMonthlyBudget,
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
                const res = await createCategory(data, session);

                if (!res) {
                    console.log(`Algo mal ha pasado`);
                }

                console.log(res);
                resetForm();
                setIsFormOpen(false);
            } catch (err) {
                console.error(err);
            }
        } else if (buttonPushed === "button-update") {
            try {
                const res = await updatedCategory(
                    isCategory._id,
                    data,
                    session
                );

                if (!res) {
                    console.log(`Algo mal ha pasado`);
                }

                console.log(res);
                setIsUpdatedPushed(false);
                resetForm();
                setIsFormOpen(false);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        resetForm();
    };

    return (
        <>
            <form
                className="w-full flex flex-col justify-start items-center gap-3 text-slate-700"
                onSubmit={(e) => {
                    handleSubmitCategory(e);
                }}
            >
                <div className="w-full flex flex-row justify-between mb-8 gap-2">
                    <div className="flex flex-col justify-start">
                        <h1 className="text-2xl">Crear Nueva Categoría</h1>
                        <p>Personaliza tu categoría de gastos</p>
                    </div>
                    <div className="">
                        <X
                            className="w-15 h-15 transition-all duration-300 hover:rotate-90 cursor-pointer"
                            onClick={handleCloseForm}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col justify-start gap-2">
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nombre Categoría"
                        className="h-12 w-full bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:bg-white focus:border-slate-900 transition-colors rounded-lg p-2 focus:bg-slate-100 shadow-md"
                        onChange={(e) => {
                            setIsCategoryName(e.target.value || "");
                        }}
                        value={isCategoryName}
                    />
                </div>

                <div className="w-full flex flex-col justify-start gap-2">
                    <label htmlFor="monthly_budget">Presupuesto Mensual</label>
                    <input
                        id="monthly_budget"
                        type="number"
                        placeholder="0"
                        className="h-12 w-full bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:bg-white focus:border-slate-900 transition-colors rounded-lg p-2 focus:bg-slate-100 shadow-md"
                        onChange={(e) => {
                            setIsMonthlyBudget(e.target.value);
                        }}
                        value={isMonthlyBudget || ""}
                    />
                </div>
                <div className="w-full flex flex-col justify-start gap-2">
                    <label htmlFor="color">Color</label>
                    <div className="flex flex-wrap gap-2">
                        {availableColors.map((color) => {
                            return <CardColor key={color.id} color={color} />;
                        })}
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2 mt-5 mb-5">
                    <label htmlFor="icono">Icono</label>
                    <div className="flex flex-wrap gap-2">
                        {availableIcons.map((icon) => {
                            const IconComponent = icon.icon;
                            const isActive = isSelectedIcon === icon.name;
                            return (
                                <button
                                    key={icon.name}
                                    type="button"
                                    className={`w-[70px] h-[70px] aspect-square rounded-2xl border-2 transition-all duration-100 flex items-center justify-center group hover:scale-105 p-2 ${
                                        isActive
                                            ? "border-slate-900 bg-green-300/25 shadow-md"
                                            : "border-slate-300 hover:border-slate-900 bg-gray-100 hover:bg-white"
                                    }`}
                                    onClick={() =>
                                        setIsSelectedIcon((prev) =>
                                            prev === icon.name
                                                ? null
                                                : icon.name
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
                </div>
                <div className="w-full flex flex-col justify-start gap-2">
                    <label>Tipo de Categoría</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                        <button
                            id="fixedExpenses"
                            className="border-2 flex flex-start items-center p-5 rounded-xl gap-2 cursor-pointer"
                        >
                            <ReceiptEuro className="w-7 h-7" />
                            Gasto Fijo
                        </button>
                        <button
                            id="leisureExpenses"
                            className="border-2 flex flex-start items-center p-5 rounded-xl gap-2 cursor-pointer"
                        >
                            <TicketsPlane className="w-7 h-7" />
                            Gasto Ocio
                        </button>
                        <button
                            id="investment"
                            className="border-2 flex flex-start items-center p-5 rounded-xl gap-2 cursor-pointer"
                        >
                            <TrendingUp className="w-7 h-7" />
                            Invesión
                        </button>
                        <button
                            id="savings"
                            className="border-2 flex flex-start items-center p-5 rounded-xl gap-2 cursor-pointer"
                        >
                            <PiggyBank className="w-7 h-7" />
                            Ahorro
                        </button>
                    </div>
                </div>
                <div className="flex justify-center items-center w-full gap-3">
                    {!isUpdatedPushed ? (
                        <div className="flex flex-col w-full gap-2">
                            <button
                                id="button-create"
                                type="submit"
                                className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 hover:from-indigo-200 to-purple-200"
                            >
                                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                <span>Crear Categoría</span>
                            </button>
                            <button
                                id="button-cancel"
                                type="button"
                                className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-100 border-slate-200 hover:bg-slate-300 hover:border-slate-900 text-slate-600"
                                onClick={handleCloseForm}
                            >
                                <Ban  className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                <span>Cancelar</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col w-full gap-2">
                            <button
                                id="button-update"
                                type="submit"
                                className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-gradient-to-br from-purple-100 to-indigo-100 text-indigo-700 hover:from-purple-200 to-indigo-200"
                            >
                                <Repeat className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                <span>Actualizar Categoría</span>
                            </button>
                            <button
                                id="button-cancel"
                                type="submit"
                                className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-100 border-slate-200 hover:bg-slate-300 hover:border-slate-900 text-slate-600"
                                onClick={handleCloseForm}
                            >
                                <Ban className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                <span>Cancelar</span>
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </>
    );
};

export default FormCategory;
