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
            className={`border-2 flex flex-start items-center p-5 rounded-xl gap-2 cursor-pointer ${
                isPaymentType === button_type
                    ? "bg-slate-800 text-slate-100 shadow-md"
                    : "border-slate-300 hover:border-slate-800 bg-gray-100 hover:bg-slate-300 hover:text-slate-800"
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