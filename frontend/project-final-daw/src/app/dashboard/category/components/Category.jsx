import { useCategories } from '@/app/context/CategoryContext.js';
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
    CircleX
} from "lucide-react";

const Category = ({ category }) => {
    const { setIsCategory, setIsUpdatedPushed } = useCategories();
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

    const handleClick = async (cat) => {
        console.log(cat);
        setIsCategory(cat);
        setIsUpdatedPushed(true);
    };


    const iconCategory = availableIcons.find((i) => i.name === icon);

    return (
        <>
            <div className="w-[250px] group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#1A8B84]/20 transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => {handleClick(category)}}
            >
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: `linear-gradient(135deg, rgba(26, 139, 132, 0.03) 0%, rgba(0, 199, 199, 0.02) 100%)`,
                    }}
                />

                <div className="relative flex items-start justify-between mb-4 group-hover:scale-110 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-[#1A8B84]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}                            
                        >
                            {iconCategory && (
                                <iconCategory.icon className="w-7 h-7" />
                            )}
                        </div>
                        <div>
                            <h3 className="text-gray-800">{name}</h3>
                            {/* <p className="text-sm text-gray-500">
                                 transacciones
                            </p> */}
                        </div>
                    </div>
                   
                    <button 
                        type="button"
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors">
                        <CircleX className="w-6 h-6" />
                    </button>
                </div>

                {/* <div className=""></div>
                <h1>{name}</h1>
                <p>{color}</p> */}
            </div>
        </>
    );
};

export default Category;
