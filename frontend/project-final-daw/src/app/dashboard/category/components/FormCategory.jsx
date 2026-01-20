"use client";
import { useSession } from "next-auth/react";
import { useCategories } from "@/app/context/CategoryContext.js";
import { useFinancial } from "@/app/context/FinancialContext.js";
import { useSaving } from "@/app/context/SavingContext.js";
import { useState, useEffect } from "react";
import CardColor from "./CardColor.jsx";
import ButtonTypeCategoryForm from "./ButtonTypeCategoryForm.jsx";
import {
    Plus,
    ShoppingCart,
    Home,
    Car,
    Utensils,
    Heart,
    Smartphone,
    Palette,
    Wifi,
    Coffee,
    Zap,
    // TrendingUp,
    // PiggyBank,
    // ReceiptEuro,
    // TicketsPlane,
    X,
    Ban,
    Calendar,
    CreditCard,
    TriangleAlert,
    Repeat
} from "lucide-react";

const FormCategory = () => {
    const {
        isUpdatedPushed,
        isCategory,
        isCategories,
        isCategoryName,
        isCategoryColor,
        isMonthlyBudget,
        isCategoryType,
        setIsCategory,
        setIsCategoryName,
        setIsCategoryColor,
        setIsUpdatedPushed,
        createCategory,
        updatedCategory,
        setIsFormCategoryOpen,
        setIsMonthlyBudget,
        setIsCategoryType,
    } = useCategories();

    const {
        isTotalAmountToSpendFixedAndLeisure,
        isTotalSumCategoriesFixedLeisure,
        setIsTotalSumCategoriesFixedLeisure,
        amountMaxToSpendFixedLeisure,
        isSavingFromNomina,
    } = useFinancial();

    const { isTotalSavingsRealTime } = useSaving();
    const [isSelectedIcon, setIsSelectedIcon] = useState(null);
    const { data: session } = useSession();
    const [isActiveButtonCategory, setIsActiveButtonCategory] = useState(false);
    const [isMonthlyBudgetWrong, setIsMonthlyBudgetWrong] = useState(false);
    const [
        isMonthlyBudgetImprevistosWrong,
        setIsMonthlyBudgetImprevistosWrong,
    ] = useState(false);
    const [isAmountToShowErrorMessage, setIsAmountToShowErrorMessage] =
        useState(0);

    const resetForm = () => {
        setIsCategoryName("");
        setIsMonthlyBudget(0);
        setIsCategoryColor("");
        setIsSelectedIcon(null);
        setIsUpdatedPushed(false);
        setIsCategory({});
        setIsCategoryType(null);
    };

    const availableIcons = [
        { icon: ShoppingCart, name: "ShoppingCart" },
        { icon: Home, name: "Home" },
        { icon: Car, name: "Car" },
        { icon: Utensils, name: "Utensils" },
        { icon: Heart, name: "Heart" },
        { icon: Smartphone, name: "Smartphone" },
        { icon: Palette, name: "Palette" },
        // { icon: Plus, name: "Plus" },
        { icon: Wifi, name: "Wifi"},
        { icon: Coffee, name: "Coffe"},
        { icon: Zap, name: "Zap"},
        // { icon: Ban, name: "Ban"},
        { icon: Calendar, name: "Calendar"},
        { icon: CreditCard, name: "CreditCard"},
        { icon: TriangleAlert, name: "TriangleAlert"},

    ];

    const categoryType = ["Gasto Fijo", "Gasto Ocio", "Imprevistos"];

    useEffect(() => {
        if (isUpdatedPushed && isCategory) {
            setIsCategoryName(isCategory.name);
            setIsMonthlyBudget(isCategory.monthly_budget);
            setIsCategoryColor(isCategory.color);
            setIsSelectedIcon(isCategory.icon);
            setIsCategoryType(isCategory.category_type);
        }
    }, [isUpdatedPushed, isCategory]);

    useEffect(() => {
        if (isCategoryType || isMonthlyBudget) {
            handleCalculateMonthlyBudgetExceded();
            handleCalculateMonthlyBudgetImprevistosExceded();
        }
    }, [isCategoryType, isMonthlyBudget]);

    const handleCalculateMonthlyBudgetExceded = () => {
        const totalSumMonthlyBudget = isCategories
            .filter(
                (cat) =>
                    cat.category_type === "Gasto Fijo" ||
                    cat.category_type === "Gasto Ocio"
            )
            .reduce((acc, current) => acc + current.monthly_budget, 0);

        if (
            isCategoryType !== "Gasto Fijo" &&
            isCategoryType !== "Gasto Ocio"
        ) {
            setIsMonthlyBudgetWrong(false);
            return false;
        }

        const nuevoTotal =
            isTotalSumCategoriesFixedLeisure + Number(isMonthlyBudget);
        const nuevoTotalMonthlyBudget =
            totalSumMonthlyBudget + Number(isMonthlyBudget);

        if (
            nuevoTotal > isTotalAmountToSpendFixedAndLeisure ||
            nuevoTotalMonthlyBudget > isTotalAmountToSpendFixedAndLeisure
        ) {
            setIsMonthlyBudgetWrong(true);
            setIsAmountToShowErrorMessage(
                amountMaxToSpendFixedLeisure(
                    totalSumMonthlyBudget,
                    isTotalAmountToSpendFixedAndLeisure
                )
            );
        } else {
            setIsMonthlyBudgetWrong(false);
        }
    };

    const handleCalculateMonthlyBudgetImprevistosExceded = () => {
        if (isCategoryType !== "Imprevistos") {
            setIsMonthlyBudgetImprevistosWrong(false);
            return false;
        }

        if (isSavingFromNomina < isMonthlyBudget) {
            setIsMonthlyBudgetImprevistosWrong(true);
            return true;
        } else {
            setIsMonthlyBudgetImprevistosWrong(false);
            return false;
        }
    };

    const handleSubmitCategory = async (e) => {
        e.preventDefault();

        const buttonPushed = e.nativeEvent.submitter.id;

        /***********************************************
         *         DATA QUE PASAMOS AL BACKEND         *
         ***********************************************/

        const data = {
            name: isCategoryName,
            monthly_budget: isMonthlyBudget,
            category_type: isCategoryType,
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
        /***********************************************
         *         DATA QUE PASAMOS AL BACKEND         *
         ***********************************************/

        if (buttonPushed === "button-create") {
            try {
                if (isMonthlyBudgetWrong) {
                    return;
                }

                const res = await createCategory(data, session);
                console.log("DATA CATEGORY TYPE", data.category_type);

                if (!res) {
                    console.log(`Algo mal ha pasado`);
                }

                console.log(res);
                resetForm();
                setIsFormCategoryOpen(false);
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
                setIsFormCategoryOpen(false);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleCloseForm = () => {
        setIsFormCategoryOpen(false);
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
                        placeholder="0.00 €"
                        className="h-12 w-full bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:bg-white focus:border-slate-900 transition-colors rounded-lg p-2 focus:bg-slate-100 shadow-md"
                        onChange={(e) => {
                            setIsMonthlyBudget(e.target.value);
                        }}
                        value={isMonthlyBudget || ""}
                    />
                </div>
                {isMonthlyBudgetWrong && (
                    <div className="w-full flex flex-col justify-center items-center border-2 border-red-200 rounded-xl p-3 bg-red-100 text-red-500 shadow-xl shadow-red-200/20">
                        <h1>PARTIDA DE GASTO EXCEDIENDO EL LÍMITE</h1>
                        {/* <p>Crear categoría de tipo "Imprevistos"</p>
                        <p>Descontará la cantidad del ahorro</p> */}
                        <div className="flex flex-row gap-2">
                            <p>Cantidad Máxima </p>
                            <h1 className="text-xl">
                                {"€ "}
                                {isAmountToShowErrorMessage}
                            </h1>
                        </div>
                    </div>
                )}
                {isMonthlyBudgetImprevistosWrong && (
                    <div className="w-full flex flex-col justify-center items-center border-2 border-red-200 rounded-xl p-3 bg-red-100 text-red-500 shadow-xl shadow-red-200/20">
                        <h1>PARTIDA DE GASTO EXCEDIENDO EL LÍMITE</h1>
                        {/* <p>Crear categoría de tipo "Imprevistos"</p>
                        <p>Descontará la cantidad del ahorro</p> */}
                        <div className="flex flex-row gap-2">
                            <p>Cantidad Máxima </p>
                            <h1 className="text-xl">
                                {"€ "}
                                {Number(isSavingFromNomina).toFixed(2)}
                            </h1>
                        </div>
                    </div>
                )}
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
                                            ? "bg-slate-800 text-slate-100 shadow-md"
                                            : "border-slate-300 hover:border-slate-800 bg-gray-100 hover:bg-slate-300 hover:text-slate-800"
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
                                        className={`w-7 h-7 transition-colors`}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="w-full flex flex-col justify-start gap-2">
                    <label>Tipo de Categoría</label>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {categoryType.map((cat) => (
                            <ButtonTypeCategoryForm
                                key={cat}
                                id={cat}
                                button_type={cat}
                                setIsCategoryType={setIsCategoryType}
                                isCategoryType={isCategoryType}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex justify-center items-center w-full gap-3">
                    {!isUpdatedPushed ? (
                        <div className="flex flex-col w-full gap-2">
                            <button
                                id="button-create"
                                type={
                                    isMonthlyBudgetWrong ||
                                    isMonthlyBudgetImprevistosWrong
                                        ? "button"
                                        : "submit"
                                }
                                className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-800 text-slate-100 hover:border-slate-100"
                                onClick={
                                    isMonthlyBudgetWrong ||
                                    isMonthlyBudgetImprevistosWrong
                                        ? handleCloseForm
                                        : undefined
                                }
                            >
                                {isMonthlyBudgetWrong ||
                                isMonthlyBudgetImprevistosWrong ? (
                                    <>
                                        <X className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                        <span>Cerrar</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                        <span>Crear Categoría</span>
                                    </>
                                )}
                                {/* <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                <span>Crear Categoría</span> */}
                            </button>
                            <button
                                id="button-cancel"
                                type="button"
                                className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-100 border-slate-200 hover:bg-slate-300 hover:border-slate-900 text-slate-600"
                                onClick={handleCloseForm}
                            >
                                <Ban className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                <span>Cancelar</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col w-full gap-2">
                            <button
                                id="button-update"
                                type="submit"
                                className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-800 text-slate-100 hover:border-slate-100"
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
