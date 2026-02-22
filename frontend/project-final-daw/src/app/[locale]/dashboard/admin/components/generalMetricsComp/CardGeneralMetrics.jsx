import { toRGBA } from "@/app/functions/toRGBA.js";
import { FolderOpen, UserStar, UserRoundCheck } from "lucide-react";

const CardGeneralMetrics = ({ data, titel, icon }) => {
    const availableIcons = [
        { icon: FolderOpen, name: "FolderOpen" },
        { icon: UserStar, name: "UserStar" },
        { icon: UserRoundCheck, name: "UserRoundCheck" },
    ];
    let valueDataToShow = 0;
    const ICON = availableIcons.find((ic) => ic.name === icon);
    const Icono = ICON.icon;

    switch (ICON.name) {
        case "UserRoundCheck":
            valueDataToShow = data.length;
            console.log(valueDataToShow);
            break;

        case "FolderOpen":
            valueDataToShow = data.reduce(
                (total, user) => total + user.categories.length,
                0
            );
            console.log(valueDataToShow);
            break;

        case "UserStar":
            valueDataToShow = data.reduce(
                (total, user) => total + (user.role === "admin"),
                0
            );
            console.log(valueDataToShow);
            break;
    }

    return (
        <div className="flex flex-col justify-center items-start gap-4 w-[400px] group bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-300 overflow-hidden cursor-pointer">
            <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 border-2 mb-2 bg-slate-800 dark:bg-slate-400 border-slate-700 dark:border-slate-300`}
            >
                <Icono className="size-6 text-slate-200 dark:text-slate-800" />
            </div>
            <h1 className="text-slate-600 dark:text-slate-300">{titel}</h1>
            {/* {ICON.name === 'UserRoundCheck' && ()} */}
            <p className="text-xl font-medium text-slate-900 dark:text-slate-100">{valueDataToShow}</p>
        </div>
    );
};

export default CardGeneralMetrics;
