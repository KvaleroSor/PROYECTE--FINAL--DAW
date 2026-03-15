"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useInversion } from "@/app/context/InversionContext";

const PortfolioEvolutionChart = () => {
    const { isInversions } = useInversion();

    // Ordenar inversiones por fecha y calcular valor acumulado
    const sortedInversions = [...isInversions].sort(
        (a, b) => new Date(a.inversion_date) - new Date(b.inversion_date)
    );

    let accumulatedInvested = 0;
    let accumulatedValue = 0;

    const chartData = sortedInversions.map((inv) => {
        accumulatedInvested += inv.amount || 0;
        const profitability = ((inv.real_profitability || 0) * (inv.amount || 0)) / 100;
        accumulatedValue += (inv.amount || 0) + profitability;

        return {
            date: new Date(inv.inversion_date).toLocaleDateString("es-ES", {
                month: "short",
                year: "numeric",
            }),
            invertido: accumulatedInvested,
            valor: accumulatedValue,
            ganancia: accumulatedValue - accumulatedInvested,
        };
    });

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
                    <p className="text-slate-900 dark:text-slate-100 font-semibold mb-2">
                        {label}
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 text-sm">
                        Invertido: €{payload[0].value.toFixed(2)}
                    </p>
                    <p className="text-green-600 dark:text-green-400 text-sm">
                        Valor Total: €{payload[1].value.toFixed(2)}
                    </p>
                    <p className="text-purple-600 dark:text-purple-400 text-sm">
                        Ganancia: €{payload[2].value.toFixed(2)}
                    </p>
                </div>
            );
        }
        return null;
    };

    if (chartData.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-500 dark:text-slate-400">
                No hay datos para mostrar
            </div>
        );
    }

    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                    <XAxis
                        dataKey="date"
                        className="text-slate-600 dark:text-slate-400"
                        tick={{ fill: "currentColor" }}
                    />
                    <YAxis
                        className="text-slate-600 dark:text-slate-400"
                        tick={{ fill: "currentColor" }}
                        label={{
                            value: "Valor (€)",
                            angle: -90,
                            position: "insideLeft",
                            className: "fill-slate-600 dark:fill-slate-400",
                        }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{
                            paddingTop: "20px",
                        }}
                        formatter={(value) => {
                            const labels = {
                                invertido: "Capital Invertido",
                                valor: "Valor Total",
                                ganancia: "Ganancia Acumulada",
                            };
                            return (
                                <span className="text-slate-700 dark:text-slate-300">
                                    {labels[value]}
                                </span>
                            );
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="invertido"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: "#3b82f6", r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="valor"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ fill: "#10b981", r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="ganancia"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ fill: "#8b5cf6", r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PortfolioEvolutionChart;
