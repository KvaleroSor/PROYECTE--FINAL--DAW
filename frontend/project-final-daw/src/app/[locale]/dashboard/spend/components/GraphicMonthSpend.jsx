'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslations } from 'next-intl';

const monthlyExpensesData = [
    { monthKey: "jan", amount: 1250, budget: 1500 },
    { monthKey: "feb", amount: 1450, budget: 1500 },
    { monthKey: "mar", amount: 1320, budget: 1500 },
    { monthKey: "apr", amount: 1680, budget: 1500 },
    { monthKey: "may", amount: 1520, budget: 1500 },
    { monthKey: "jun", amount: 1390, budget: 1500 },
    { monthKey: "jul", amount: 1450, budget: 1500 },
    { monthKey: "aug", amount: 1680, budget: 1500 },
    { monthKey: "sep", amount: 1520, budget: 1500 },
    { monthKey: "oct", amount: 1390, budget: 1500 },
    { monthKey: "nov", amount: 1450, budget: 1500 },
    { monthKey: "dec", amount: 1680, budget: 1500 },
];

export default function AnalisisMensual() {
    const t = useTranslations('monthlyAnalysis');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const translatedData = monthlyExpensesData.map(item => ({
        ...item,
        month: t(`months.${item.monthKey}`)
    }));

    return (
        <div className="w-full bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm transition-colors duration-200">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl text-gray-900 dark:text-slate-100 mb-2">
                        {t('title')} {currentYear - 1}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {t('subtitle')}
                    </p>
                </div>
                <div className="flex items-center gap-6">
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

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={translatedData}>
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