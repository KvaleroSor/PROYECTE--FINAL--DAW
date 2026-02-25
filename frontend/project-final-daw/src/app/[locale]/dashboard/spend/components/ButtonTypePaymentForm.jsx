import { CreditCard, HandCoins, Smartphone } from "lucide-react";

const ButtonTypePaymentForm = ({
    button_type,
    setIsPaymentType,
    isPaymentType,
}) => {
    const availableIcons = [
        { icon: CreditCard, name: "Tarjeta" },
        { icon: HandCoins, name: "Efectivo" },
        { icon: Smartphone, name: "Transferencia" },
    ];

    const Icon = availableIcons.find((icon) => icon.name === button_type);

    return (
        <button
            type="button"
            key={button_type}
            id={button_type}
            className={`flex flex-start items-center p-5 rounded-xl gap-2 cursor-pointer transition-colors ${isPaymentType === button_type
                ? "bg-slate-500 dark:bg-slate-600 text-slate-50 shadow-md"
                : "bg-gray-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 hover:bg-slate-500 hover:text-slate-50 dark:hover:text-slate-50"
                }`}
            onClick={(e) => {
                if (isPaymentType === e.target.closest("button").id) {
                    setIsPaymentType(null);
                } else {
                    setIsPaymentType(e.target.closest("button").id);
                }
            }}
        >
            <Icon.icon className="w-7 h-7" />
            {`${button_type}`}
        </button>
    );
};

export default ButtonTypePaymentForm;