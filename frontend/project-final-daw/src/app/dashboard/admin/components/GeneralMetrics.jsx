const GeneralMetrics = ({data}) => {
    return (
        <div className="w-full flex flex-col justify-center items-center rounded-xl bg-slate-10 p-4 shadow-xl gap-10">
            <h1 className="text-4xl text-slate-600 mt-2 underline underline-lg">
                MÉTRICAS GENERALES
            </h1>
            <div className="flex flex-wrap mb-10 gap-2">
                <div className="flex flex-col justify-center items-center gap-2 w-auto group bg-slate-10 rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer">
                    <h1>TOTAL USUARIOS REGISTRADOS</h1>
                    <p>{data.length}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 w-auto group bg-slate-10 rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer">
                    <h1>TOTAL CATEGORIAS REGISTRADAS</h1>
                    <p>
                        {data.reduce(
                            (total, user) => total + user.categories.length,
                            0
                        )}
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 w-auto group bg-slate-10 rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer">
                    <h1>TOTAL ADMINS REGISTRADOS</h1>
                    <p>
                        {data.reduce(
                            (total, user) => total + (user.role === "admin"),
                            0
                        )}
                    </p>
                </div>
                {/* <div className="flex flex-col justify-center items-center gap-2 w-auto group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer">
                            <h1>TOTAL USUARIOS REGISTRADOS</h1>
                            <p>{}</p>
                        </div> */}
            </div>
        </div>
    );
};

export default GeneralMetrics;
