"use client";

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function Example({ data }) {
    const t = useTranslations("admin");
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        checkDarkMode();

        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    return (
        <LineChart
            data={data}
            style={{ outline: "none" }}
            onFocus={(e) => e.target.blur()}
        >
            <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDarkMode ? "#475569" : "#e2e8f0"}
            />
            <XAxis
                dataKey="date"
                fontSize={12}
                className="text-xs sm:text-sm"
                stroke={isDarkMode ? "#94a3b8" : "#64748b"}
            />
            <YAxis
                allowDecimals={false}
                fontSize={12}
                className="text-xs sm:text-sm"
                stroke={isDarkMode ? "#94a3b8" : "#64748b"}
            />
            <Tooltip
                contentStyle={{
                    backgroundColor: isDarkMode ? "#334155" : "#ffffff",
                    border: `1px solid ${isDarkMode ? "#475569" : "#e2e8f0"}`,
                    borderRadius: "8px",
                    color: isDarkMode ? "#f1f5f9" : "#1e293b"
                }}
                labelStyle={{
                    color: isDarkMode ? "#f1f5f9" : "#1e293b"
                }}
            />
            <Legend
                wrapperStyle={{
                    color: isDarkMode ? "#f1f5f9" : "#1e293b"
                }}
            />
            <Line
                type="monotone"
                dataKey="users"
                name={t("userRegistration")}
                stroke={isDarkMode ? "#38bdf8" : "#0EA5E9"}
                strokeWidth={2}
                activeDot={{ r: 6 }}
            />
        </LineChart>
    );
}
