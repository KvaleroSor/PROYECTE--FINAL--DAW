"use client";

import { useEffect } from "react";

// Componente que actualiza el atributo lang del HTML según el locale
export default function SetHtmlLang({ locale }) {
    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    return null;
}
