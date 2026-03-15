"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useInversion } from "@/app/context/InversionContext";

const ProfitabilityComparisonChart = () => {
    const { isInversions } = useInversion();

    // Preparar datos para el gráfico
    const chartData = isInversions.map((inv, index) => ({
        name: inv.symbol || inv.type || `Inversión ${index + 1}`,
        objetivo: inv.target_profitability || 0,
        real: inv.real_profitability || 0,
        amount: inv.amount || 0,
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
                    <p className="text-slate-900 dark:text-slate-100 font-semibold mb-2">
                        {label}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Inversión: €{data.amount.toFixed(2)}
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 text-sm">
                        Objetivo: {data.objetivo.toFixed(2)}%
                    </p>
                    <p className="text-green-600 dark:text-green-400 text-sm">
                        Real: {data.real.toFixed(2)}%
                    </p>
                    <p className={`text-sm font-medium mt-1 ${
                        data.real >= data.objetivo
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                    }`}>
                        {data.real >= data.objetivo
                            ? `+${(data.real - data.objetivo).toFixed(2)}% sobre objetivo`
                            : `${(data.real - data.objetivo).toFixed(2)}% bajo objetivo`}
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
                <BarChart
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
                        dataKey="name" 
                        className="text-slate-600 dark:text-slate-400"
                        tick={{ fill: 'currentColor' }}
                    />
                    <YAxis 
                        className="text-slate-600 dark:text-slate-400"
                        tick={{ fill: 'currentColor' }}
                        label={{ 
                            value: 'Rentabilidad (%)', 
                            angle: -90, 
                            position: 'insideLeft',
                            className: 'fill-slate-600 dark:fill-slate-400'
                        }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                        wrapperStyle={{
                            paddingTop: '20px'
                        }}
                        formatter={(value) => {
                            const labels = {
                                objetivo: 'Rentabilidad Objetivo',
                                real: 'Rentabilidad Real'
                            };
                            return <span className="text-slate-700 dark:text-slate-300">{labels[value]}</span>;
                        }}
                    />
                    <Bar 
                        dataKey="objetivo" 
                        fill="#3b82f6" 
                        name="objetivo"
                        radius={[8, 8, 0, 0]}
                    />
                    <Bar 
                        dataKey="real" 
                        fill="#10b981" 
                        name="real"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProfitabilityComparisonChart;
