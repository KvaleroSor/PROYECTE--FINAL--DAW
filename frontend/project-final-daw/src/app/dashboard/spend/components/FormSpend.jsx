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
    // TrendingUp,
    // PiggyBank,
    // ReceiptEuro,
    // TicketsPlane,
    Ban,
} from "lucide-react";
import { useSpends } from "@/app/context/SpendContext.js";
import { useCategories } from "@/app/context/CategoryContext.js";
import { useSaving } from "@/app/context/SavingContext.js";
import { useFinancial } from "@/app/context/FinancialContext.js";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ButtonTypePaymentForm from "./ButtonTypePaymentForm.jsx";

const FormSpend = () => {
    const {
        //Estado
        isCategoryId,
        isDescription,
        isAmount,
        isPaymentType,
        isUpdatedPushed,
        isSpendDate,
        //Setters
        setIsFormSpendOpen,
        setIsCategoryId,
        setIsDescription,
        setIsAmount,
        setIsPaymentType,
        setIsUpdatedPushed,
        setIsCategoryType,
        setIsSpendDate,
        //Crud
        postNewSpend,
        isCategoryType,
    } = useSpends();
    const { isCategories, isMonthlyBudget } = useCategories();
    const { isTotalSavingsRealTime } = useSaving();
    const {
        isTotalAmountToSpendFixedAndLeisure,
        isTotalSumCategoriesFixedLeisure,
        setIsTotalSumCategoriesFixedLeisure,
        amountMaxToSpendFixedLeisure,
        isSavingFromNomina,
    } = useFinancial();
    const { isSpends } = useSpends();
    const [isMonthlyBudgetWrong, setIsMonthlyBudgetWrong] = useState(false);
    const [
        isMonthlyBudgetImprevistosWrong,
        setIsMonthlyBudgetImprevistosWrong,
    ] = useState(false);
    const [isAmountToShowErrorMessage, setIsAmountToShowErrorMessage] =
        useState(0);
    const [isFormData, setIsFormData] = useState({});
    const { data: session } = useSession();

    useEffect(() => {
        if (isCategoryId && isCategories.length > 0) {
            const selectedCategory = isCategories.find(
                (cat) => cat._id === isCategoryId
            );
            if (selectedCategory) {
                setIsCategoryType(selectedCategory.category_type);
            }
        }
    }, [isCategoryId, isCategories]);

    useEffect(() => {
        if (isCategoryType || isAmount) {
            handleCalculateMonthlyBudgetExceded();
            handleCalculateMonthlyBudgetImprevistosExceded();
        }
    }, [isCategoryType, isAmount]);

    const handleCalculateMonthlyBudgetExceded = () => {
        const totalGastosRealizados = isSpends
            .filter((spend) => {
                const category = isCategories.find(
                    (cat) => cat._id === spend.category_id
                );
                return (
                    category &&
                    (category.category_type === "Gasto Fijo" ||
                        category.category_type === "Gasto Ocio")
                );
            })
            .reduce((acc, spend) => acc + spend.amount, 0);

        if (
            isCategoryType !== "Gasto Fijo" &&
            isCategoryType !== "Gasto Ocio"
        ) {
            setIsMonthlyBudgetWrong(false);
            return false;
        }

        const nuevoTotal = isTotalSumCategoriesFixedLeisure + Number(isAmount);
        const nuevoTotalMonthlyBudget =
            totalGastosRealizados + Number(isAmount);

        if (
            nuevoTotal > isTotalAmountToSpendFixedAndLeisure ||
            nuevoTotalMonthlyBudget > isTotalAmountToSpendFixedAndLeisure
        ) {
            setIsMonthlyBudgetWrong(true);
            setIsAmountToShowErrorMessage(
                amountMaxToSpendFixedLeisure(
                    totalGastosRealizados,
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

        if (isSavingFromNomina < isAmount) {
            setIsMonthlyBudgetImprevistosWrong(true);
            return true;
        } else {
            setIsMonthlyBudgetImprevistosWrong(false);
            return false;
        }
    };

    const handleCloseForm = () => {
        resetForm();
    };

    const payment_type = ["Tarjeta", "Efectivo", "Transferencia"];

    const resetForm = () => {
        setIsFormSpendOpen(false);
        setIsCategoryId("");
        setIsDescription("");
        setIsAmount("");
        setIsSpendDate(null);
        setIsPaymentType("");
    };

    const findNameCategory = () => {
        const category = isCategories.find((cat) => cat._id === isCategoryId);
        return category.name;
    };

    const handleSubmitSpend = async (e) => {
        e.preventDefault();

        const buttonPushed = e.nativeEvent.submitter.id;
        console.log(buttonPushed);

        /***********************************************
         *         DATA QUE PASAMOS AL BACKEND         *
         ***********************************************/

        const data = {
            category_id: isCategoryId,
            description: isDescription,
            amount: isAmount,
            date: isSpendDate,
            payment_type: isPaymentType,
        };

        console.log("📤 DATA TO SEND:", data);

        /***********************************************
         *         DATA QUE PASAMOS AL BACKEND         *
         ***********************************************/

        /***********************************************
         *         POST DE LA DATA A LA BBDD           *
         ***********************************************/

        if (buttonPushed === "button-create") {
            try {
                const res = await postNewSpend(data, session);

                if (!res) {
                    console.log(`Algo mal ha pasado`);
                }

                console.log(res);
                resetForm();
            } catch (err) {
                console.error(err);
            }
        }

        /***********************************************
         *         POST DE LA DATA A LA BBDD           *
         ***********************************************/

        resetForm();
    };

    return (
        <>
            <form
                className="w-full flex flex-col justify-start items-center gap-3 text-slate-700 dark:text-slate-300"
                onSubmit={(e) => {
                    handleSubmitSpend(e);
                }}
            >
                <div className="w-full flex flex-row justify-between mb-3 gap-2">
                    <div className="flex flex-col justify-start">
                        <h1 className="text-2xl text-slate-900 dark:text-slate-100">Crear Nuevo Gasto</h1>
                        <p className="text-slate-600 dark:text-slate-400">Añade un nuevo gasto a la lista</p>
                    </div>
                    <div className="">
                        <X
                            className="w-15 h-15 transition-all duration-300 hover:rotate-90 cursor-pointer text-slate-700 dark:text-slate-300"
                            onClick={handleCloseForm}
                        />
                    </div>
                </div>

                <div className="w-full flex flex-row justify-start items-center gap-2">
                    <p className="text-2xl text-slate-800 dark:text-slate-100">
                        {findNameCategory()}
                    </p>
                </div>
                <div className="w-full flex flex-col justify-start gap-2">
                    <label htmlFor="description" className="text-slate-700 dark:text-slate-300">Descripción</label>
                    <input
                        id="description"
                        type="text"
                        placeholder="Escribe una breve descripción"
                        className="h-12 w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:outline-none focus:bg-white dark:focus:bg-slate-600 focus:border-slate-900 dark:focus:border-slate-400 transition-colors rounded-lg p-2 shadow-md text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                        onChange={(e) => {
                            setIsDescription(e.target.value || "");
                        }}
                        value={isDescription}
                    />
                </div>
                <div className="w-full flex flex-col justify-start gap-2">
                    <label htmlFor="amount" className="text-slate-700 dark:text-slate-300">Cantidad del Gasto</label>
                    <input
                        id="amount"
                        type="number"
                        placeholder="0.00 €"
                        className="h-12 w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:outline-none focus:bg-white dark:focus:bg-slate-600 focus:border-slate-900 dark:focus:border-slate-400 transition-colors rounded-lg p-2 shadow-md text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                        onChange={(e) => {
                            setIsAmount(e.target.value);
                        }}
                        value={isAmount || ""}
                    />
                </div>
                {isMonthlyBudgetWrong && (
                    <div className="w-full flex flex-col justify-center items-center border-2 border-red-200 dark:border-red-800 rounded-xl p-3 bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 shadow-xl shadow-red-200/20 dark:shadow-red-900/20">
                        <h1 className="">GASTO EXCEDIENDO EL LÍMITE</h1>
                        <div className="flex flex-row gap-2">
                            <p>Cantidad Máxima </p>
                            <h1 className="text-xl font-semibold">
                                {"€ "}
                                {isAmountToShowErrorMessage}
                            </h1>
                        </div>
                    </div>
                )}
                {isMonthlyBudgetImprevistosWrong && (
                    <div className="w-full flex flex-col justify-center items-center border-2 border-red-200 dark:border-red-800 rounded-xl p-3 bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 shadow-xl shadow-red-200/20 dark:shadow-red-900/20">
                        <h1 className="font-bold">
                            GASTO EXCEDIENDO EL LÍMITE
                        </h1>
                        <div className="flex flex-row gap-2">
                            <p>Cantidad Máxima </p>
                            <h1 className="text-xl">
                                {"€ "}
                                {Number(isSavingFromNomina).toFixed(2)}
                            </h1>
                        </div>
                    </div>
                )}
                <div className="w-full flex flex-col justify-start gap-2">
                    <label htmlFor="date" className="text-slate-700 dark:text-slate-300">Fecha del Gasto</label>
                    <input
                        id="date"
                        type="date"
                        className="h-12 w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:outline-none focus:bg-white dark:focus:bg-slate-600 focus:border-slate-900 dark:focus:border-slate-400 transition-colors rounded-lg p-2 shadow-md text-slate-900 dark:text-slate-100"
                        onChange={(e) => {
                            setIsSpendDate(e.target.value);
                        }}
                        value={isSpendDate || ""}
                    />
                </div>
                <div className="w-full flex flex-col justify-start gap-2">
                    <label className="text-slate-700 dark:text-slate-300">Tipo de Pago</label>
                    <div className="w-fit flex flex-wrap gap-2">
                        {payment_type.map((cat) => (
                            <ButtonTypePaymentForm
                                key={cat}
                                id={cat}
                                button_type={cat}
                                setIsPaymentType={setIsPaymentType}
                                isPaymentType={isPaymentType}
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
                                className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-800 dark:bg-slate-600 text-slate-100 hover:border-slate-100 dark:hover:border-slate-400"
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
                                        <span>Crear Gasto</span>
                                    </>
                                )}
                            </button>
                            <button
                                id="button-cancel"
                                type="button"
                                className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 hover:border-slate-900 dark:hover:border-slate-400 text-slate-600 dark:text-slate-300"
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
                                className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-800 dark:bg-slate-600 text-slate-100 hover:border-slate-100 dark:hover:border-slate-400"
                            >
                                <Repeat className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                <span>Actualizar Gasto</span>
                            </button>
                            <button
                                id="button-cancel"
                                type="submit"
                                className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 hover:border-slate-900 dark:hover:border-slate-400 text-slate-600 dark:text-slate-300"
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

export default FormSpend;
