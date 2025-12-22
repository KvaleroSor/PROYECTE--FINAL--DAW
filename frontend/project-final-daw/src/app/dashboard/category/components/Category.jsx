import { useCategories } from "@/app/context/CategoryContext.js";
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
    Icon,
    MoreVertical,
    CircleX,
    SquareX,
} from "lucide-react";
import { toRGBA } from "@/app/functions/toRGBA.js";

const Category = ({ category, session }) => {
    const { setIsCategory, setIsUpdatedPushed, deleteCategory, setIsFormOpen } =
        useCategories();
    const { name, color, icon } = category;

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

    const handleClick = async (e, cat) => {
        if (e.target.closest("button")?.id !== "button-delete") {
            setIsCategory(cat);
            console.log("CATEGORÍA ", cat);
            setIsUpdatedPushed(true);
            setIsFormOpen(true);
        } else {
            const res = await deleteCategory(cat._id, session);
            console.log(res);
        }
    };

    const iconCategory = availableIcons.find((i) => i.name === icon);
    const Icono = iconCategory.icon;

    return (
        <>
            <div
                className="w-[250px] group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={(e) => {
                    handleClick(e, category);
                }}
            >
                {/* <div className="inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" /> */}

                <div className="flex items-start justify-between mb-4 group-hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border-2`}
                            style={{
                                backgroundColor: toRGBA(color, 0.25),
                                border: `2px solid ${toRGBA(color, 0.6)}`,
                            }}
                        >
                            {Icono && (
                                <Icono className="w-7 h-7 text-gray-700" />
                            )}
                        </div>
                        <div>
                            <h3 className="text-gray-700">{name}</h3>
                            {/* <p className="text-sm text-gray-500">
                                 transacciones
                            </p> */}
                        </div>
                    </div>

                    <button
                        id="button-delete"
                        type="button"
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                        // onClick={() => {handleButtonClick(category)}}
                    >
                        <CircleX className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Category;
