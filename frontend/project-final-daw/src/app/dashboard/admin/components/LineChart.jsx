import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function Example({ data }) {
    return (
        <LineChart
            data={data}
            style={{ outline: "none" }}
            onFocus={(e) => e.target.blur()}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey="date"
                fontSize={12}
                className="text-xs sm:text-sm"
            />
            <YAxis
                allowDecimals={false}
                fontSize={12}
                className="text-xs sm:text-sm"
            />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="users"
                name="Registro Usuarios"
                stroke="#0EA5E9"
                strokeWidth={2}
                activeDot={{ r: 6 }}
            />
        </LineChart>
    );
}
