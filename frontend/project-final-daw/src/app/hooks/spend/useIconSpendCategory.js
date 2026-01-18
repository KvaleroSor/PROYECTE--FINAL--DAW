import { useMemo } from "react";
// import { useSpends } from "@/app/context/SpendContext.js";
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
    Wifi,
    Coffee,
    Zap,
    Ban,
    Calendar,
    CreditCard,
    TriangleAlert,
} from "lucide-react";

export const useIconSpendCategory = (category_id) => {
    const { isCategories } = useCategories();

    const availableIcons = [
        { icon: ShoppingCart, name: "ShoppingCart" },
        { icon: Home, name: "Home" },
        { icon: Car, name: "Car" },
        { icon: Utensils, name: "Utensils" },
        { icon: Heart, name: "Heart" },
        { icon: Smartphone, name: "Smartphone" },
        { icon: Palette, name: "Palette" },
        { icon: Plus, name: "Plus" },
        { icon: Wifi, name: "Wifi" },
        { icon: Coffee, name: "Coffe" },
        { icon: Zap, name: "Zap" },
        { icon: Ban, name: "Ban" },
        { icon: Calendar, name: "Calendar" },
        { icon: CreditCard, name: "CreditCard" },
        { icon: TriangleAlert, name: "TriangleAlert" },
    ];

    const isIconSpendCategory = useMemo(() => {
        const categoryIcon = isCategories.find(
            (cat) => cat._id === category_id,
        );
   
        const iconName = categoryIcon?.icon || "TriangleAlert";
   
        const foundIcon = availableIcons.find((item) => item.name === iconName);
        return foundIcon?.icon || TriangleAlert;
    }, [isCategories, category_id]);

    const isCategoryName = useMemo(() => {
        const categoryIcon = isCategories.find(
            (cat) => cat._id === category_id,
        );
        return categoryIcon?.name || "";
    }, [isCategories, category_id]);

   

    return { isIconSpendCategory, isCategoryName };
};
