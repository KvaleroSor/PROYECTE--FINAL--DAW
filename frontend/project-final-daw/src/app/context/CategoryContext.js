"use client";

import { createContext, useContext, useState, useEffect } from "react";
import getCategories from "@/services/categories/getCategories.js";
import postCategory from "@/services/categories/postCategory.js";
import udapteCategory from "@/services/categories/updateCategory.js";
import removeCategory from "@/services/categories/removeCategory.js";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
    const [isCategories, setIsCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCategory, setIsCategory] = useState({});
    const [isCategoryName, setIsCategoryName] = useState("");
    const [isCategoryColor, setIsCategoryColor] = useState("");
    const [isUpdatedPushed, setIsUpdatedPushed] = useState(false);

    // --------------------------
    // DEVOLVER TODAS LAS CATEGORÍAS
    // --------------------------

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const data = await getCategories();
            setIsCategories(data.data);
        } catch (err) {
            console.error(
                "ERROR - NO SE PUEDEN CARGAR LAS CATEGORIAS | GLOBAL CONTEXT:",
                err
            );
        } finally {
            setIsLoading(false);
        }
    };

    // --------------------------
    // CREAR CATEGORÍAS
    // --------------------------

    const createCategory = async (newCategory) => {
        try {
            const res = await postCategory(newCategory);
            await fetchCategories();
            return res;
        } catch (err) {
            console.error(
                "ERROR - NO SE PUEDE CREAR LA CATEGORIA | GLOBAL CONTEXT:",
                err
            );
        }
    };

    // --------------------------
    // ACTUALIZAR CATEGORÍAS
    // --------------------------

    const updatedCategory = async (id, dataCategory) => {
        try {
            const res = await udapteCategory(id, dataCategory);
            await fetchCategories();
            return res;
        } catch (err) {
            console.error(
                "ERROR - NO SE PUEDE ACTUALIZAR LA CATEGORIA | GLOBAL CONTEXT:",
                err
            );
        }
    };

    // --------------------------
    // ELIMINAR CATEGORÍAS
    // --------------------------

    const deleteCategory = async (id) => {
        try {
            const res = await removeCategory(id);
            await fetchCategories();
            return res;
        } catch (err) {
            console.error(
                "ERROR - NO SE PUEDE ELIMINAR LA CATEGORIA | GLOBAL CONTEXT:",
                err
            );
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoriesContext.Provider
            value={{
                isCategories,
                isCategory,
                isCategoryName,
                isCategoryColor,
                isUpdatedPushed,
                setIsCategory,
                setIsCategoryName,
                setIsCategoryColor,
                setIsUpdatedPushed,
                fetchCategories,
                createCategory,
                updatedCategory,
                deleteCategory,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = () => useContext(CategoriesContext);
