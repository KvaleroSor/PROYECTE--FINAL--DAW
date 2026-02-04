import React from 'react'
import Inversion from './Inversion'
import { TrendingUp, Plus } from 'lucide-react'

const GridInversion = () => {
    return (
        <>
            <div className='w-full dark:bg-slate-800 flex flex-col justify-center items-center gap-4 bg-slate-50 dark:bg-slate-800 shadow-lg rounded-2xl hover:shadow-md transition-all duration-300'>
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-900 dark:bg-slate-700 rounded-2xl rounded-bl-none rounded-br-none p-4'>
                        <div className='flex flex-row justify-start items-start gap-3 sm:gap-4'>
                            <div className='w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 bg-slate-700 dark:bg-slate-800 text-slate-100 flex-shrink-0'>
                                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-slate-50" />
                            </div>
                            <div className='flex flex-col justify-start items-start'>
                                <h3 className="text-slate-50 text-base sm:text-lg lg:text-xl font-medium">Inversión</h3>
                                <p className="text-slate-200 text-xs sm:text-sm">Tu portfolio de inversiones</p>
                            </div>
                        </div>
                        <button
                            className="w-full sm:w-auto flex items-center justify-center gap-2 h-10 px-3 sm:px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group bg-slate-700 dark:bg-slate-400 text-slate-100 text-sm sm:text-base flex-shrink-0">
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
                            <span>Añadir inversión</span>
                        </button>
                    </div>
                </div>
                <div className="w-full p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <Inversion />
                    <Inversion />
                    <Inversion />
                    <Inversion />
                </div>
            </div>
        </>
    )
}

export default GridInversion