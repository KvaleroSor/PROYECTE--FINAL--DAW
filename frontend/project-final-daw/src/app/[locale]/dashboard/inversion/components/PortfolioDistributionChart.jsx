"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useInversion } from "@/app/context/InversionContext";

const PortfolioDistributionChart = () => {
    const { isInversions } = useInversion();

    // Agrupar inversiones por tipo
    const distributionData = isInversions.reduce((acc, inv) => {
        const type = inv.type || "Otro";
        const existing = acc.find((item) => item.name === type);
        
        if (existing) {
            existing.value += inv.amount || 0;
        } else {
            acc.push({
                name: type,
                value: inv.amount || 0,
            });
        }
        
        return acc;
    }, []);

    // Colores para cada tipo de inversión
    const COLORS = [
        "#1e293b", // slate-800
        "#475569", // slate-600
        "#64748b", // slate-500
        "#94a3b8", // slate-400
        "#cbd5e1", // slate-300
        "#e2e8f0", // slate-200
        "#f1f5f9", // slate-100
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const total = distributionData.reduce((sum, item) => sum + item.value, 0);
            const percentage = ((payload[0].value / total) * 100).toFixed(2);
            
            return (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
                    <p className="text-slate-900 dark:text-slate-100 font-semibold">
                        {payload[0].name}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                        €{payload[0].value.toFixed(2)}
                    </p>
                    <p className="text-slate-500 dark:text-slate-500 text-sm">
                        {percentage}% del total
                    </p>
                </div>
            );
        }
        return null;
    };

    if (distributionData.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-500 dark:text-slate-400">
                No hay datos para mostrar
            </div>
        );
    }

    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={distributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {distributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value, entry) => (
                            <span className="text-slate-700 dark:text-slate-300">
                                {value}
                            </span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PortfolioDistributionChart;
