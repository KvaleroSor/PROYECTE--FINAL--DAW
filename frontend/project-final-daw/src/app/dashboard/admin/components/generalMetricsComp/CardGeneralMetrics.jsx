import { toRGBA } from "@/app/functions/toRGBA.js";
import { ChartColumnStacked, UserStar, UserRoundCheck } from "lucide-react";

const CardGeneralMetrics = ({ data, titel, icon }) => {
    const availableIcons = [
        { icon: ChartColumnStacked, name: "ChartColumnStacked" },
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

        case "ChartColumnStacked":
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
        <div className="flex flex-col justify-center items-start gap-4 w-[400px] group bg-slate-10 rounded-2xl p-6 shadow-xl border border-gray-100 hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer">
            <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border-2 mb-2`}
                style={{
                    backgroundColor: toRGBA("#10B981", 0.25),
                    // border: `2px solid ${toRGBA("#10B981", 0.6)}`,
                }}
            >
                <Icono className="w-7 h-7 text-slate-600" />
            </div>
            <h1 className="text-slate-600">{titel}</h1>
            {/* {ICON.name === 'UserRoundCheck' && ()} */}
            <p className="text-xl font-medium">{valueDataToShow}</p>
        </div>
    );
};

export default CardGeneralMetrics;
