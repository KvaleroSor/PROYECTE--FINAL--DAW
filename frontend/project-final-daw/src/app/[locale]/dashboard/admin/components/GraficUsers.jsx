"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import LineChart from "./LineChart.jsx";

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

    chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 flex justify-center items-center flex-col rounded-xl bg-slate-10 p-3 sm:p-4 lg:p-6 shadow-xl gap-4 sm:gap-6 lg:gap-10">
            {/* <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-600 sm:mt-2 text-center border border-xl p-8 rounded-xl shadow-xl">
                GRÁFICO REGISTRO USUARIOS
            </h1>             */}
            <ResponsiveContainer
                width="100%"
                height="100%"
                style={{ outline: "none" }}
                className="focus:outline-none [&>*]:outline-none [&>*>*]:focus:outline-none"
            >
                <LineChart data={chartData} />
            </ResponsiveContainer>
        </div>
    );
}
