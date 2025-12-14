import { toRGBA } from "@/app/functions/toRGBA.js";
import { CircleX, User, Mail, Briefcase, FolderOpen } from "lucide-react";

const UserRegisteredCategories = ({ data }) => {
    return (
        <div className="w-full flex flex-col justify-center items-center rounded-xl bg-slate-10 p-4 shadow-xl gap-10">
            {/* <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-600 border border-xl p-8 rounded-xl shadow-xl">
                USUARIOS REGISTRADOS Y NUM. CATEGORÍAS
            </h1> */}
            <div className="flex flex-wrap gap-2 justify-center items-center">
                {data.map((user) => {
                    return (
                        <div className="w-[350px] group bg-white rounded-2xl p-3 shadow-xl border border-gray-100 hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer">
                            <div className="w-full flex flex-col items-start gap-4 text-slate-600">
                                {/* Avatar + Badge - SIN wrapper extra */}
                                <div className="w-full flex items-start justify-between mb-4">
                                    {/* Avatar a la izquierda */}
                                    <div className="flex flex-shrink-0 w-14 h-14 rounded-xl bg-amber-50 shadow-lg text-amber-600 items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                        <User className="size-6" />
                                    </div>

                                    {/* Badge a la derecha - SOLO si es admin */}
                                    {user.role === "admin" && (
                                        <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                                            Admin
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-row gap-2">
                                    <p className="text-gray-700 font-semibold">
                                        {user.name}
                                    </p>
                                </div>
                                <div className="flex justify-center items-center flex-row gap-2">
                                    <Mail className="w-4 h-4" />
                                    <p>{user.email}</p>
                                </div>
                                <div className="flex justify-center items-center flex-row gap-2">
                                    <Briefcase className="w-4 h-4" />
                                    <p>
                                        {user.role[0].toUpperCase() +
                                            user.role.substring(1)}
                                    </p>
                                </div>
                                <div className="flex justify-center items-center flex-row gap-2">
                                    <FolderOpen className="w-4 h-4" />
                                    <p>{user.categories.length}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserRegisteredCategories;
