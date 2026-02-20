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

export default function Example({ data }) {
    const t = useTranslations("admin");

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
                name={t("userRegistration")}
                stroke="#0EA5E9"
                strokeWidth={2}
                activeDot={{ r: 6 }}
            />
        </LineChart>
    );
}
