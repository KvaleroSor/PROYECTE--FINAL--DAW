"use client";

import { useEffect } from "react";

export default function PWAInstaller() {
    useEffect(() => {
        // Service Worker desactivado temporalmente para debugging
        // TODO: Reactivar cuando se resuelva el error /undefinedundefined
        /*
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker
                    .register("/sw.js")
                    .then((registration) => {
                        console.log("✅ Service Worker registrado:", registration);
                    })
                    .catch((error) => {
                        console.error("❌ Error al registrar Service Worker:", error);
                    });
            });
        }
        */
    }, []);

    return null;
}
