const GridSpendsMainPage = () => {


    // if (isLoading) {
    //     return (
    //         <div className="flex justify-center items-center h-64">
    //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
    //         </div>
    //     );
    // }

    return (<>
        {/* <div className="h-full grid grid-rows-[auto_auto_auto] lg:grid-rows-[3fr_2fr_5fr] sm:grid-cols-1"> */}
        <div className="w-full  flex flex-col gap-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-md transition-all duration-300">

                {/*Header */}
                <div className="mb-8">
                    <h1 className="text-3xl text-gray-900 dark:text-slate-100 mb-2">Gastos</h1>
                    <p className="text-gray-600 dark:text-slate-400">
                        Gestiona tus gastos y alcanza tus metas
                    </p>
                </div>
                <div className="w-full rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* Tarjeta de resumen total */}
                        <div className="bg-white h-[150px] dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300">
                            <div className="flex items-center gap-2 mb-2">


                            </div>

                            <p className="text-sm text-slate-500 dark:text-slate-400">

                            </p>
                        </div>

                        {/* Tarjeta de metas activas */}
                        <div className="bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300">
                            <div className="flex items-center gap-2 mb-2">


                            </div>

                            <p className="text-sm text-slate-500 dark:text-slate-400">

                            </p>
                        </div>

                        {/* Tarjeta de presupuesto disponible */}
                        <div className="bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-md transition-all duration-300">
                            <div className="flex items-center gap-2 mb-2">


                            </div>


                        </div>
                    </div>

                </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-md transition-all duration-300">
                {/* <GridCategories /> */}
                <div className="w-full h-[500px] bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-md p-2 transition-all duration-300 flex justify-center items-center">
                    <p>Gráfica amb els gastos per mes comparant amb el budget</p>
                </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-md transition-all duration-300">
                <div className="w-full min-w-0">
                    {/* <Saving /> */}
                    {/* <GridSpends /> */}
                    <div className="w-full h-[300px] rounded-xl flex justify-center items-center">
                        <p>Buscador input/buttons</p>
                    </div>
                </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-md transition-all duration-300">
                {/* <GridInversion /> */}
                <div className="w-full h-[500px] rounded-xl flex justify-center items-center">
                    <p>Resultat del buscador</p>
                </div>
            </div>
        </div>
    </>);
}

export default GridSpendsMainPage;