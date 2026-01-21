"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Cargar tema guardado o preferencia del sistema al montar
    useEffect(() => {
        setIsMounted(true);
        
        const savedTheme = localStorage.getItem("theme");
        
        if (savedTheme) {
            setIsDarkMode(savedTheme === "dark");
        } else {
            // Si no hay tema guardado, usar preferencia del sistema
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setIsDarkMode(prefersDark);
        }
    }, []);

    // Aplicar clase dark al documento y guardar en localStorage
    useEffect(() => {
        if (!isMounted) return;

        const root = document.documentElement;
        
        if (isDarkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode, isMounted]);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    // Evitar flash de contenido incorrecto durante SSR
    if (!isMounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme debe usarse dentro de un ThemeProvider");
    }
    return context;
};
