"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";
import getCategories from "@/services/categories/getCategories.js";
import getCategoryById from "@/services/categories/getCategoryById.js";
import postCategory from "@/services/categories/postCategory.js";
import udapteCategory from "@/services/categories/updateCategory.js";
import removeCategory from "@/services/categories/removeCategory.js";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
    const { data: session } = useSession();
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
        if(!session?.user?.id) return;

        try {
            setIsLoading(true);
            const data = await getCategories(session.user.id);
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
    // DEVOLVER CATEGORÍA POR ID
    // --------------------------

    const fetchCategoryById = async (id) => {
        try {
            setIsLoading(true);
            const data = await getCategoryById(id);
            setIsCategory(data.data);
        } catch (err) {
            console.error(
                "ERROR - NO SE PUEDE CARGAR LA CATEGORÍA | GLOBAL CONTEXT:",
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
        console.log("🚀 INICIANDO CREACIÓN DE CATEGORÍA - Context");
        console.log("📋 Datos de categoría:", newCategory);
        console.log("🔐 Sesión en context:", session);
        
        try {
            const res = await postCategory(newCategory, session);
            console.log("✅ CATEGORÍA CREADA EXITOSAMENTE:", res);
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
            await fetchCategoryById(id);
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
            setIsCategory({});
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
                fetchCategoryById,
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
