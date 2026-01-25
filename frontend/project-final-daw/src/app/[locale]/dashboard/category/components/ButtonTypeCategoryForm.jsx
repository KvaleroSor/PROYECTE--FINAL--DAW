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
            className={`border-2 flex flex-start items-center p-5 rounded-xl gap-2 cursor-pointer transition-colors ${isCategoryType === button_type
                    ? "bg-slate-800 dark:bg-slate-600 text-slate-100 shadow-md"
                    : "border-slate-300 dark:border-slate-600 hover:border-slate-800 dark:hover:border-slate-400 bg-gray-100 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200"
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
