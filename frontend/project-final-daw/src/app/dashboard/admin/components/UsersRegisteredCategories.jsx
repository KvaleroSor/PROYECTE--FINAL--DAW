import { toRGBA } from "@/app/functions/toRGBA.js";
import { CircleX, User } from "lucide-react";

const UserRegisteredCategories = ({ data }) => {
    return (
        <div className="w-full flex flex-col justify-center items-center rounded-xl bg-slate-10 p-4 shadow-xl gap-10">
            <h1 className="text-4xl text-slate-600 mt-4 underline underline-lg">
                USUARIOS REGISTRADOS Y NUM. CATEGORÍAS
            </h1>
            <div className="flex flex-wrap gap-2 justify-center items-center">
                {data.map((user) => {
                    return (
                        <div className="w-auto group bg-slate-10 rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer">
                            <div className="flex items-start justify-between gap-6 mb-4 group-hover:scale-105 transition-all duration-300 ">
                                <div className="flex items-center gap-4 text-slate-600">
                                    <div
                                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border-2`}
                                        style={{
                                            backgroundColor: toRGBA(
                                                "Blue",
                                                0.25
                                            ),
                                            border: `2px solid ${toRGBA(
                                                "Blue",
                                                0.6
                                            )}`,
                                        }}
                                    >
                                        <User className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <div className="flex flex-row gap-2">
                                            <h3>Nombre: </h3>
                                            <h3 className="text-gray-700">
                                                {user.name}
                                            </h3>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <p>Email: </p>
                                            <p>{user.email}</p>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <p>Role: </p>
                                            <p>{user.role}</p>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <p>Núm. Categorias: </p>
                                            <p>{user.categories.length}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* <button
                                        id="button-delete"
                                        type="button"
                                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                        // onClick={() => {handleButtonClick(category)}}
                                    >
                                        <CircleX className="w-6 h-6" />
                                    </button> */}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserRegisteredCategories;
