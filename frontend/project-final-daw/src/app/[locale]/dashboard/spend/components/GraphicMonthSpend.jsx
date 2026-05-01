'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslations } from 'next-intl';
import { useSpends } from '@/app/context/SpendContext';
import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AnalisisMensual() {
    const t = useTranslations('monthlyAnalysis');
    const { isSpends } = useSpends();
    const currentDate = new Date();
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

    // Calcular datos mensuales basados en gastos reales
    const monthlyExpensesData = useMemo(() => {
        const months = [
            { monthKey: "jan", monthNum: 0 },
            { monthKey: "feb", monthNum: 1 },
            { monthKey: "mar", monthNum: 2 },
            { monthKey: "apr", monthNum: 3 },
            { monthKey: "may", monthNum: 4 },
            { monthKey: "jun", monthNum: 5 },
            { monthKey: "jul", monthNum: 6 },
            { monthKey: "aug", monthNum: 7 },
            { monthKey: "sep", monthNum: 8 },
            { monthKey: "oct", monthNum: 9 },
            { monthKey: "nov", monthNum: 10 },
            { monthKey: "dec", monthNum: 11 },
        ];

        return months.map(({ monthKey, monthNum }) => {
            const monthSpends = isSpends?.filter(spend => {
                if (!spend.date) return false;

                let spendDate = new Date(spend.date);

                // Si la fecha es inválida, intentar con timestamp
                if (isNaN(spendDate.getTime())) {
                    spendDate = new Date(parseInt(spend.date));
                }

                // Si sigue siendo inválida, saltar
                if (isNaN(spendDate.getTime())) {
                    return false;
                }

                return (
                    spendDate.getMonth() === monthNum &&
                    spendDate.getFullYear() === selectedYear
                );
            }) || [];

            const amount = monthSpends.reduce((sum, spend) => sum + (spend.amount || 0), 0);
            const budget = 1500;

            return { monthKey, amount, budget };
        });
    }, [isSpends, selectedYear]);

    const translatedData = monthlyExpensesData.map(item => ({
        ...item,
        month: t(`months.${item.monthKey}`)
    }));

    const currentMonth = currentDate.getMonth();
    const isCurrentYear = selectedYear === currentDate.getFullYear();
    const displayData = isCurrentYear
        ? translatedData.slice(0, currentMonth + 1)
        : translatedData;

    return (
        <div className="w-full bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm transition-colors duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                <div className="flex items-start justify-start gap-4 w-full sm:w-auto">
                    <div className='flex items-center'>
                        <div className='flex flex-col items-start'>
                            <h2 className="text-2xl sm:text-3xl text-gray-900 dark:text-slate-100 mb-2">
                                {t('title')} {selectedYear}
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                {t('subtitle')}
                            </p>
                        </div>
                    </div>
                    {/* <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                        <button
                            onClick={() => setSelectedYear(selectedYear - 1)}
                            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        </button>
                        <span className="text-lg font-semibold text-slate-900 dark:text-slate-100 min-w-[80px] text-center">
                            {selectedYear}
                        </span>
                        <button
                            onClick={() => setSelectedYear(selectedYear + 1)}
                            disabled={selectedYear >= currentDate.getFullYear()}
                            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        </button>
                    </div> */}
                </div>
                <div className="flex flex-col items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                        <button
                            onClick={() => setSelectedYear(selectedYear - 1)}
                            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        </button>
                        <span className="text-lg font-semibold text-slate-900 dark:text-slate-100 min-w-[80px] text-center">
                            {selectedYear}
                        </span>
                        <button
                            onClick={() => setSelectedYear(selectedYear + 1)}
                            disabled={selectedYear >= currentDate.getFullYear()}
                            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        </button>
                    </div>
                    <div className="flex flex-row gap-2 flex-wrap justify-center">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-slate-900 dark:bg-slate-100"></div>
                            <span className="text-sm text-slate-600 dark:text-slate-300">{t('spent')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                            <span className="text-sm text-slate-600 dark:text-slate-300">{t('budget')}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={displayData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e2e8f0"
                            className="dark:stroke-slate-400"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="month"
                            stroke="#64748b"
                            className="dark:stroke-slate-100"
                            style={{ fontSize: '14px' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#64748b"
                            className="dark:stroke-slate-100"
                            style={{ fontSize: '14px' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--tooltip-bg, #ffffff)',
                                border: '1px solid var(--tooltip-border, #e2e8f0)',
                                borderRadius: '12px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                color: 'var(--tooltip-text, #0f172a)'
                            }}
                            cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                        />
                        <Bar
                            dataKey="budget"
                            fill="#e2e8f0"
                            className="dark:fill-slate-600"
                            radius={[8, 8, 0, 0]}
                            barSize={40}
                        />
                        <Bar
                            dataKey="amount"
                            fill="#0f172a"
                            className="dark:fill-slate-300"
                            radius={[8, 8, 0, 0]}
                            barSize={40}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}