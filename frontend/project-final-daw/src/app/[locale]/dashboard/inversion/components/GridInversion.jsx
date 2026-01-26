import React from 'react'
import Inversion from './Inversion'
import { TrendingUp, Plus } from 'lucide-react'

const GridInversion = () => {
    return (
        <>
            <div className='w-full dark:bg-slate-800 flex flex-col justify-center items-center gap-4 shadow-2xl rounded-2xl hover:shadow-md transition-all duration-300'>
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='w-full flex flex-row justify-between items-center bg-slate-900 dark:bg-slate-700 rounded-2xl rounded-bl-none rounded-br-none p-4'>
                        <div className='w-full flex flex-row justify-start items-start gap-4 ml-6 mt-4'>
                            <div className='w-12 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 bg-slate-700 dark:bg-slate-800 text-slate-100'>
                                <TrendingUp className="w-6 h-6 text-slate-50" />
                            </div>
                            <div className='w-full flex flex-col justify-start items-start'>
                                <h3 className="text-slate-50 text-xl font-medium">Inversión</h3>
                                <p className="text-slate-200 text-sm">Tu portfolio de inversiones</p>
                            </div>
                        </div>
                        <div className='w-full flex flex-row justify-end items-end mr-3'>
                            <button
                                className="flex items-center gap-2 h-10 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group bg-slate-700 dark:bg-slate-400 text-slate-100 dark:text-slate-100 dark:hover:border-slate-100 dark:hover:bg-slate-500">
                                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                <span>Añadir inversión</span>
                            </button>
                        </div>
                    </div>
                    <div>

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