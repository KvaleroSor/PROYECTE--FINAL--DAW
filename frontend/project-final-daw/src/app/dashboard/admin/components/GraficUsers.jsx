"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function GraficUsers({ data }) {
    const chartData = data.reduce((acc, user) => {
        const date = new Date(user.register_date).toISOString().split("T")[0];

        const existingDate = acc.find((item) => item.date === date);
        if (existingDate) {
            existingDate.users += 1;
        } else {
            acc.push({ date, users: 1 });
        }

        return acc;
    }, []);

    // Ordenar por fecha
    chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

    console.log(chartData);

    return (
        <div className="w-full h-80 flex justify-center items-center flex-col rounded-xl bg-slate-10 p-4 shadow-xl gap-10">
            <h1 className="text-4xl text-slate-600 mt-2 underline underline-lg ">
                GRÁFICO REGISTRO USUARIOS
            </h1>            
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="users" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
