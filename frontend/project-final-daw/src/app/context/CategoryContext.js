"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import getCategories from "@/services/categories/getCategories.js";
import getCategoryById from "@/services/categories/getCategoryById.js";
import postCategory from "@/services/categories/postCategory.js";
import udapteCategory from "@/services/categories/updateCategory.js";
import removeCategory from "@/services/categories/removeCategory.js";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
    const { data: session } = useSession();
    
    // Estados principales
    const [isCategories, setIsCategories] = useState([]);
    const [isCategory, setIsCategory] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isFormCategoryOpen, setIsFormCategoryOpen] = useState(false);
    const [isUpdatedPushed, setIsUpdatedPushed] = useState(false);
    
    // Estados del formulario
    const [isCategoryName, setIsCategoryName] = useState("");
    const [isMonthlyBudget, setIsMonthlyBudget] = useState(0);
    const [isCategoryColor, setIsCategoryColor] = useState("");
    const [isCategoryType, setIsCategoryType] = useState(null);

    // --------------------------
    // DEVOLVER TODAS LAS CATEGORÍAS
    // --------------------------

    const fetchCategories = async () => {
        if (!session?.user?.user_id || !session?.accessToken) return;        

        try {
            setIsLoading(true);
            const data = await getCategories(session.user.user_id, session);
            setIsCategories(data.data);
        } catch (err) {
            console.error(
                "ERROR - NO SE PUEDEN CARGAR LAS CATEGORIAS | GLOBAL CONTEXT:",
                err
            );
            setIsCategories([]);
        } finally {
            setIsLoading(false);
        }
    };

    // --------------------------
    // DEVOLVER CATEGORÍA POR ID
    // --------------------------

    const fetchCategoryById = async (id, session) => {
        try {
            setIsLoading(true);
            const data = await getCategoryById(id, session);
            console.log("DATA DESDE SERVER - ", data.data);
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

    const createCategory = async (newCategory, session) => {
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

    const updatedCategory = async (id, dataCategory, session) => {
        try {
            const res = await udapteCategory(id, dataCategory, session);

            console.log("➡️ RESPUESTA FUNCTION FETCH:", res);

            await fetchCategories();
            await fetchCategoryById(id, session);
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

    const deleteCategory = async (id, session) => {
        try {
            const res = await removeCategory(id, session);
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
        if (session?.user?.user_id && session?.accessToken) {
            fetchCategories();
        }
    }, [session]);

    const memorizedCategories = useMemo(() => isCategories, [isCategories]);

    return (
        <CategoriesContext.Provider
            value={{
                // Estados principales
                isCategories: memorizedCategories,
                isCategory,
                isLoading,
                isFormCategoryOpen,
                isUpdatedPushed,

                // Estados del formulario
                isCategoryName,
                isCategoryColor,
                isMonthlyBudget,
                isCategoryType,

                // Setters
                setIsCategory,
                setIsFormCategoryOpen,
                setIsUpdatedPushed,
                setIsCategoryName,
                setIsCategoryColor,
                setIsMonthlyBudget,
                setIsCategoryType,

                // Funciones CRUD
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

export const useCategories = () => {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error("useCategories must be used within a CategoriesProvider");
    }
    return context;
};
