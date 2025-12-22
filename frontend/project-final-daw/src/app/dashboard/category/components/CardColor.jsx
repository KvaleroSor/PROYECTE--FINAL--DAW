'use client';

import { toRGBA } from "@/app/functions/toRGBA.js";
import { useCategories } from "@/app/context/CategoryContext.js";

const CardColor = ({ color }) => {
    const { setIsCategoryColor } = useCategories();
    const { id, colorRef } = color;
    
    const handleClickButtonColor = () => {
        setIsCategoryColor(id);
    };

    return (
        <div className="">
            <button
                className={`w-[70px] h-[70px] hover:scale-105 transition-all duration-100 rounded-xl cursor-pointer`}
                style={{
                    backgroundColor: toRGBA(colorRef, 0.25),
                    border: `2px solid ${toRGBA(colorRef, 0.6)}`,
                }}
                onClick={handleClickButtonColor}
            />
        </div>
    );
};

export default CardColor;
