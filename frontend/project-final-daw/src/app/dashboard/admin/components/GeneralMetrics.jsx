import CardGeneralMetrics from "./generalMetricsComp/CardGeneralMetrics.jsx";

const GeneralMetrics = ({ data }) => {
    return (
        <div className="w-full flex flex-col justify-center items-center rounded-xl bg-slate-10 p-4 shadow-xl gap-10">
            {/* <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-600 border border-xl p-8 rounded-xl shadow-xl">
                MÉTRICAS GENERALES
            </h1> */}
            <div className="flex flex-wrap mb-10 gap-2">
                <CardGeneralMetrics
                    data={data}
                    titel={"TOTAL USUARIOS REGISTRADOS"}
                    icon={"UserRoundCheck"}
                />
                <CardGeneralMetrics
                    data={data}
                    titel={"TOTAL CATEGORIAS REGISTRADAS"}
                    icon={"FolderOpen"}
                />
                <CardGeneralMetrics
                    data={data}
                    titel={"TOTAL ADMINS REGISTRADOS"}
                    icon={"UserStar"}
                />
            </div>
        </div>
    );
};

export default GeneralMetrics;
