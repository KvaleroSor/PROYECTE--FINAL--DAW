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
        isData,
        isPaymentType,
        isUpdatedPushed,
        //Setters
        setIsFormSpendOpen,
        setIsCategoryId,
        setIsDescription,
        setIsAmount,
        setIsData,
        setIsPaymentType,
        setIsUpdatedPushed,
        //Crud
        postNewSpend,
        isCategoryType,        
    } = useSpends();
    const { calculateAmountSavingWithImprevistos } = useFinancial();
    const { isCategories } = useCategories();
    const [isFormData, setIsFormData] = useState({});
    const { data: session } = useSession();

    const handleCloseForm = () => {
        resetForm();
    };

    console.log("🔍 SESSION COMPLETE FORM SPEND:", session);
    console.log("🔍 SESSION USER:", session?.user);
    console.log("🔍 USER ID:", session?.user?.user_id);

    const payment_type = ["Tarjeta", "Efectivo", "Transferencia"];

    const resetForm = () => {
        setIsFormSpendOpen(false);
        setIsCategoryId("");
        setIsDescription("");
        setIsAmount("");
        setIsData(null);
        setIsPaymentType("");
    };

    const findNameCategory = () => {
        const category = isCategories.find((cat) => cat._id === isCategoryId);
        console.log(category.name);
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
            user_id: session?.user?.user_id,
            category_id: isCategoryId,
            description: isDescription,
            amount: isAmount,
            date: isData,
            payment_type: isPaymentType,
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
        calculateAmountSavingWithImprevistos(isCategoryType, isAmount);
    };

    return (
        <>
            <form
                className="w-full flex flex-col justify-start items-center gap-3 text-slate-700"
                onSubmit={(e) => {
                    handleSubmitSpend(e);
                }}
            >
                <div className="w-full flex flex-row justify-between mb-3 gap-2">
                    <div className="flex flex-col justify-start">
                        <h1 className="text-2xl">Crear Nuevo Gasto</h1>
                        <p>Añade un nuevo gasto a la lista</p>
                    </div>
                    <div className="">
                        <X
                            className="w-15 h-15 transition-all duration-300 hover:rotate-90 cursor-pointer"
                            onClick={handleCloseForm}
                        />
                    </div>
                </div>

                <div className="w-full flex flex-row justify-start items-center gap-2">
                    <p className="text-2xl text-slate-800">
                        {findNameCategory()}
                    </p>
                </div>
                <div className="w-full flex flex-col justify-start gap-2">
                    <label htmlFor="description">Descripción</label>
                    <input
                        id="description"
                        type="text"
                        placeholder="Escribe una breve descripción"
                        className="h-12 w-full bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:bg-white focus:border-slate-900 transition-colors rounded-lg p-2 focus:bg-slate-100 shadow-md"
                        onChange={(e) => {
                            setIsDescription(e.target.value || "");
                        }}
                        value={isDescription}
                    />
                </div>
                <div className="w-full flex flex-col justify-start gap-2">
                    <label htmlFor="amount">Cantidad del Gasto</label>
                    <input
                        id="amount"
                        type="number"
                        placeholder="0.00 €"
                        className="h-12 w-full bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:bg-white focus:border-slate-900 transition-colors rounded-lg p-2 focus:bg-slate-100 shadow-md"
                        onChange={(e) => {
                            setIsAmount(e.target.value);
                        }}
                        value={isAmount || ""}
                    />
                </div>
                <div className="w-full flex flex-col justify-start gap-2">
                    <label htmlFor="date">Fecha del Gasto</label>
                    <input
                        id="date"
                        type="date"
                        className="h-12 w-full bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:bg-white focus:border-slate-900 transition-colors rounded-lg p-2 focus:bg-slate-100 shadow-md"
                        onChange={(e) => {
                            setIsData(e.target.value);
                        }}
                        value={isData || ""}
                    />
                </div>
                <div className="w-full flex flex-col justify-start gap-2">
                    <label>Tipo de Categoría</label>
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
                                type="submit"
                                className="w-full p-4 h-11 sm:h-12 flex justify-center items-center border-2 transition-all duration-300 rounded-xl group bg-slate-800 text-slate-100 hover:border-slate-100"
                            >
                                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                <span>Crear Gasto</span>
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
                                <span>Actualizar Gasto</span>
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

export default FormSpend;
