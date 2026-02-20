import CardGeneralMetrics from "./generalMetricsComp/CardGeneralMetrics.jsx";
import { useTranslations } from "next-intl";

const GeneralMetrics = ({ data }) => {
    const t = useTranslations("admin");

    return (
        <div className="w-full flex flex-col justify-center items-center rounded-xl bg-slate-10 p-4 shadow-xl gap-10">
            {/* <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-600 border border-xl p-8 rounded-xl shadow-xl">
                {t("generalMetrics")}
            </h1> */}
            <div className="flex flex-wrap mb-10 gap-2">
                <CardGeneralMetrics
                    data={data}
                    titel={t("totalUsers")}
                    icon={"UserRoundCheck"}
                />
                <CardGeneralMetrics
                    data={data}
                    titel={t("totalCategories")}
                    icon={"FolderOpen"}
                />
                <CardGeneralMetrics
                    data={data}
                    titel={t("totalAdmins")}
                    icon={"UserStar"}
                />
            </div>
        </div>
    );
};

export default GeneralMetrics;
