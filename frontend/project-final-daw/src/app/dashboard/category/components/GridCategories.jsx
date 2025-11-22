"use client";

import { useCategories } from "@/app/context/CategoryContext.js";
import { useState, useEffect } from "react";
// import getCategories from "@/services/categories/getCategories.js";
import Category from "./Category.jsx";

const GridCategories = () => {
    const { isCategories, isLoading } = useCategories();
    const [isData, setIsData] = useState(null);

    if (isLoading) {
        return <p>Cargando categorías...</p>;
    }

    if (!isCategories || isCategories.length === 0) {
        return <p>No hay categorías todavía.</p>;
    }

    return (
        <>
            <div className="flex flex-wrap justify-center gap-2 m-2">
                {isCategories?.map((category) => (
                    <Category key={category.id} category={category} />
                ))}
            </div>
        </>
    );
};

export default GridCategories;
