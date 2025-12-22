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
    const [isMonthlyBudget, setIsMonthlyBudget] = useState(0);
    const [isCategoryColor, setIsCategoryColor] = useState("");
    const [isUpdatedPushed, setIsUpdatedPushed] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // --------------------------
    // DEVOLVER TODAS LAS CATEGORÍAS
    // --------------------------

    const fetchCategories = async () => {
        if (!session?.user?.user_id) return;

        console.log("🔄 FETCH CATEGORIES - Context");
        console.log("👤 Session User ID:", session?.user?.user_id);
        console.log("🔑 Session Access Token:", session?.accessToken);
        console.log("👨🏽‍💼 Role del usuario:", session?.role);

        try {
            setIsLoading(true);
            const data = await getCategories(session.user.user_id, session);
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

    const fetchCategoryById = async (id, session) => {
        try {
            setIsLoading(true);
            const data = await getCategoryById(id, session);
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
                isFormOpen,
                isMonthlyBudget,
                setIsCategory,
                setIsCategoryName,
                setIsCategoryColor,
                setIsUpdatedPushed,
                fetchCategories,
                fetchCategoryById,
                createCategory,
                updatedCategory,
                deleteCategory,
                setIsFormOpen,
                setIsMonthlyBudget
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = () => useContext(CategoriesContext);
