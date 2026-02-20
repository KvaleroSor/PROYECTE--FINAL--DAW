"use client";

import { createContext, useContext, useState, useEffect } from "react";

const BlurContext = createContext();

export const BlurProvider = ({ children }) => {
    const [isBlurred, setIsBlurred] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Guardar en localStorage cuando cambie el estado
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("blur", isBlurred ? "blur" : "no-blur");
        }
    }, [isBlurred, isMounted]);

    // Cargar tema guardado o preferencia del sistema al montar
    useEffect(() => {
        setIsMounted(true);

        const savedBlurOption = localStorage.getItem("blur");

        if (savedBlurOption) {
            setIsBlurred(savedBlurOption === "blur");
        } else {
            // Si no hay tema guardado, usar preferencia del sistema
            const prefersDark = window.matchMedia("(prefers-color-scheme: blur)").matches;
            setIsBlurred(prefersDark);
        }
    }, []);

    const blurToggle = () => {
        setIsBlurred((prev) => !prev);
    };

    // Evitar flash de contenido incorrecto durante SSR
    if (!isMounted) {
        return null;
    }

    return (
        <BlurContext.Provider value={{ isBlurred, blurToggle }}>{children}</BlurContext.Provider>
    );
};

export const useBlur = () => {
    const context = useContext(BlurContext);
    if (!context) {
        throw new Error("useBlur debe usarse dentro de un BlurProvider");
    }
    return context;
};
