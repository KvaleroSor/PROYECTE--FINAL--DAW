import {
    Plus,
    // ShoppingCart,
    // Home,
    // Car,
    // Utensils,
    // Heart,
    // Smartphone,
    // Palette,
    X,
    Repeat,
    // SquareX,
    // CircleX,
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
// import { useLeisureSpendTotalAvailable } from "@/app/hooks/spend/useLeisureSpendTotalAvailable.js";
// import { useFixedSpendTotalAvailable } from "@/app/hooks/spend/useFixedSpendTotalAvailable.js";
import { createSpendSchema } from "@validations/validationsForms.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import AlertMessage from "@/components/AlertMessage.jsx";

const FormSpend = () => {
    const {
        //Estado
        isCategoryId,
        // isDescription,
        isAmount,
        // isPaymentType,
        isUpdatedPushed,
        // isSpendDate,
        isSpend,
        //Setters
        setIsFormSpendOpen,
        setIsCategoryId,
        setIsDescription,
        setIsAmount,
        setIsPaymentType,
        setIsUpdatedPushed,
        setIsCategoryType,
        setIsSpendDate,
        setIsSpend,
        //Crud
        postNewSpend,
        isCategoryType,
        updatedSpend,

    } = useSpends();
    const { isCategories, isMonthlyBudget } = useCategories();
    const { isTotalSavingsRealTime } = useSaving();
    const {
        // isTotalAmountToSpendFixedAndLeisure,
        // isTotalSumCategoriesFixedLeisure,
        // setIsTotalSumCategoriesFixedLeisure,
        // amountMaxToSpendFixedLeisure,
        isSavingFromNomina,
        isLeisureExpensesFromNomina,
        isFixedExpensesFromNomina,
    } = useFinancial();
    const { isSpends } = useSpends();
    // const [isMonthlyBudgetWrong, setIsMonthlyBudgetWrong] = useState(false);
    const [
        isMonthlyBudgetImprevistosWrong,
        setIsMonthlyBudgetImprevistosWrong,
    ] = useState(false);
    // const [isAmountToShowErrorMessage, setIsAmountToShowErrorMessage] =
    //     useState(0);
    const [isMaxToSpend, setIsMaxToSpend] = useState(0);
    // const [isFormData, setIsFormData] = useState({});
    const { data: session } = useSession();
    const [isButtonPushed, setIsButtonPushed] = useState("create");

    const spendSchema = createSpendSchema(isMaxToSpend);
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: zodResolver(spendSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            description: "",
            amount: "",
            category_id: "",
            payment_type: "",
            date: new Date().toISOString().split('T')[0],
        },
    });

    useEffect(() => {
        if (isSpend && isUpdatedPushed) {
            setIsCategoryId(isSpend.category_id);
            reset({
                description: isSpend.description || "",
                amount: Number(isSpend.amount).toFixed(2) || 0,
                payment_type: isSpend.payment_type || "",
                date: isSpend.date
                    ? new Date(isSpend.date).toISOString().split('T')[0]
                    : new Date().toISOString().split('T')[0],
            });
        } else {
            reset({
                description: "",
                amount: "",
                payment_type: "",
                date: new Date().toISOString().split('T')[0],
            });
        }
    }, [isSpend, reset, isUpdatedPushed]);

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
        const totalSpendsFixed = isSpends
            .filter((spend) => {
                const category = isCategories.find(
                    (cat) => cat._id === spend.category_id
                );
                return (
                    category &&
                    (category.category_type === "Gasto Fijo"));
            })
            .reduce((acc, spend) => acc + spend.amount, 0);

        const totalSpendsLeisure = isSpends
            .filter((spend) => {
                const category = isCategories.find(
                    (cat) => cat._id === spend.category_id
                );
                return (
                    category &&
                    (category.category_type === "Gasto Ocio"));
            })
            .reduce((acc, spend) => acc + spend.amount, 0);

        const totalSpendsImprevistos = isSpends
            .filter((spend) => {
                const category = isCategories.find(
                    (cat) => cat._id === spend.category_id
                );
                return (
                    category &&
                    (category.category_type === "Imprevistos"));
            })
            .reduce((acc, spend) => acc + spend.amount, 0);

        if (isCategoryType === "Gasto Fijo" && totalSpendsFixed > 0) {
            setIsMaxToSpend(isFixedExpensesFromNomina - totalSpendsFixed);
        } else if (isCategoryType === "Gasto Ocio" && totalSpendsLeisure > 0) {
            setIsMaxToSpend(isLeisureExpensesFromNomina - totalSpendsLeisure);
        } else if (isCategoryType === "Imprevistos" && totalSpendsImprevistos > 0) {
            setIsMaxToSpend(isSavingFromNomina - totalSpendsImprevistos);
        } else {
            setIsMaxToSpend(0);
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
        setIsSpend(null);
        setIsButtonPushed("create");
        setIsUpdatedPushed(false);
    };

    const findNameCategory = () => {
        const category = isCategories.find((cat) => cat._id === isCategoryId);
        return category?.name || "Categoría no encontrada";
    };

    const handleSubmitSpend = async (formData) => {
        /***********************************************
         *         POST DE LA DATA A LA BBDD           *
         ***********************************************/

        if (isButtonPushed === "create") {
            try {

                const dataToSend = {
                    ...formData,
                    category_id: isCategoryId,
                };

                const res = await postNewSpend(dataToSend, session);

                if (!res) {
                    console.log(`Algo mal ha pasado`);
                }

                console.log(res);
                resetForm();
                setIsFormSpendOpen(false);
            } catch (err) {
                console.error(err);
            }
        } else if (isButtonPushed === "update") {
            try {
                const dataToSend = {
                    ...formData,
                    category_id: isCategoryId,
                };

                const res = await updatedSpend(isSpend._id, dataToSend, session);

                if (!res) {
                    console.log(`Algo mal ha pasado`);
                }

                console.log(res);
                resetForm();
                setIsFormSpendOpen(false);
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
                onSubmit={handleSubmit(handleSubmitSpend)}
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
                        {...register("description")}
                    />
                    {errors.description && (
                        <AlertMessage message={errors.description.message} type="error" />
                    )}
                </div>
                <div className="w-full flex flex-col justify-start gap-2">
                    <label htmlFor="amount" className="text-slate-700 dark:text-slate-300">Cantidad del Gasto</label>
                    <input
                        id="amount"
                        type="number"
                        step="any"
                        placeholder="0.00 €"
                        className="h-12 w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:outline-none focus:bg-white dark:focus:bg-slate-600 focus:border-slate-900 dark:focus:border-slate-400 transition-colors rounded-lg p-2 shadow-md text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                        {...register("amount", { valueAsNumber: true })}
                    />
                    {errors.amount && (
                        <AlertMessage message={errors.amount.message} type="error" />
                    )}
                </div>

                <div className="w-full flex flex-col justify-start gap-2">
                    <label htmlFor="date" className="text-slate-700 dark:text-slate-300">Fecha del Gasto</label>
                    <input
                        id="date"
                        type="date"
                        className="h-12 w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:outline-none focus:bg-white dark:focus:bg-slate-600 focus:border-slate-900 dark:focus:border-slate-400 transition-colors rounded-lg p-2 shadow-md text-slate-900 dark:text-slate-100"
                        {...register("date")}
                    />
                    {errors.date && (
                        <AlertMessage message={errors.date.message} type="error" />
                    )}
                </div>
                <div className="w-full flex flex-col justify-start gap-2">
                    <label className="text-slate-700 dark:text-slate-300">Tipo de Pago</label>
                    <Controller
                        name="payment_type"
                        control={control}
                        render={({ field }) => (
                            <div className="w-fit flex flex-wrap gap-2">
                                {payment_type.map((cat) => (
                                    <ButtonTypePaymentForm
                                        key={cat}
                                        id={cat}
                                        button_type={cat}
                                        isPaymentType={field.value}
                                        setIsPaymentType={(value) => field.onChange(value)}
                                    />
                                ))}
                            </div>
                        )}
                    />
                    {errors.payment_type && (
                        <AlertMessage message={errors.payment_type.message} type="error" />
                    )}
                </div>
                <div className="flex justify-center items-center w-full gap-3">
                    {!isUpdatedPushed ? (
                        <div className="flex flex-col w-full gap-2">
                            <button
                                id="button-create"
                                type="submit"
                                className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-800 dark:bg-slate-600 text-slate-100 hover:border-slate-100 dark:hover:border-slate-400"
                                onClick={() => setIsButtonPushed("create")}
                            >
                                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                <span>Crear Gasto</span>
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
                                onClick={() => setIsButtonPushed("update")}
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
