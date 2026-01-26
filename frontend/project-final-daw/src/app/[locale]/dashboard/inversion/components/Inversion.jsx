import React from 'react'
import { ChartBarIcon } from 'lucide-react'

const Inversion = () => {
    return (
        <>
            <div className='relative bg-white p-6 group w-full dark:bg-slate-700 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 cursor-pointer'>
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                    <ChartBarIcon className="w-6 h-6 text-white" />
                </div>
                <div className="w-full flex flex-col justify-start gap-4">
                    <div className="flex flex-row justify-between">
                        <h3 className="text-slate-900 dark:text-slate-100 text-lg font-medium">Inversión</h3>
                        <div className="flex justify-center items-center text-xs sm:text-sm rounded-3xl text-slate-500 dark:text-slate-300 m-3 p-1 px-3 bg-slate-100 dark:bg-slate-800">
                            <h3>INVERSIÓN</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inversion