import { TrendingUp, TriangleAlert, ReceiptEuro, TicketsPlane } from "lucide-react";

const ButtonTypeCategoryForm = ({
    button_type,
    setIsCategoryType,
    isCategoryType,
}) => {
    const availableIcons = [
        { icon: ReceiptEuro, name: "Gasto Fijo" },
        { icon: TicketsPlane, name: "Gasto Ocio" },
        { icon: TrendingUp, name: "Inversion" },
        { icon: TriangleAlert, name: "Imprevistos" },
    ];

    const Icon = availableIcons.find((icon) => icon.name === button_type);

    return (
        <button
            type="button"
            key={button_type}
            id={button_type}
            className={`flex flex-start items-center p-5 rounded-xl gap-2 cursor-pointer transition-colors  shadow-md ${isCategoryType === button_type
                ? "bg-slate-500 dark:bg-slate-600 text-slate-50"
                : "bg-gray-200 dark:bg-slate-800 hover:bg-slate-500 dark:hover:bg-slate-600 text-slate-800 hover:text-slate-50 dark:text-slate-200"
                }`}
            onClick={(e) => {
                if (isCategoryType === e.target.closest("button").id) {
                    setIsCategoryType(null);
                } else {
                    setIsCategoryType(e.target.closest("button").id);
                }
            }}
        >
            <Icon.icon className="w-7 h-7" />
            {`${button_type}`}
        </button>
    );
};

export default ButtonTypeCategoryForm;
