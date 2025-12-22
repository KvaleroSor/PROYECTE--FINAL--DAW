"use client";

import { toRGBA } from "@/app/functions/toRGBA.js";
import { useCategories } from "@/app/context/CategoryContext.js";

const CardColor = ({ color, isActiveColor }) => {
    const { isCategoryColor, setIsCategoryColor } = useCategories();
    const { id, colorRef } = color;
    const isActive = isCategoryColor === id;

    const handleClickButtonColor = () => {
        setIsCategoryColor(id);
        console.log("COLOR - ", isCategoryColor);
        console.log("COLOR ID - ", id);
        console.log("COLOR REF - ", colorRef);
        console.log("COLOR ACTIVE - ", isActive);

    };

    return (
        <div className="">
            <button
                className={`w-[70px] h-[70px] hover:scale-105 transition-all duration-100 rounded-xl cursor-pointer`}
                style={{
                    backgroundColor: isActive
                        ? toRGBA(colorRef, 0.7)
                        : toRGBA(colorRef, 0.25),

                    border: isActive
                        ? `2px solid ${toRGBA(colorRef)}`
                        : `2px solid ${toRGBA(colorRef, 0.6)}`,
                }}
                onClick={handleClickButtonColor}
            />
        </div>
    );
};

export default CardColor;
