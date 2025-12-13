"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getUsersRole from "./../../../services/admin/getUsersRole.js";
import { toRGBA } from "@/app/functions/toRGBA.js";
import { CircleX } from "lucide-react";

const UserAdmin = () => {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            if (session?.accessToken) {
                console.log("SESSION:", session);
                const response = await getUsersRole(session.accessToken);
                setUsers(response.data);
            }
        };

        fetchUsers();
    }, [session]);

    console.log(users);

    return (
        <div className="flex flex-col justify-center items-center gap-6">
            <h1 className="text-4xl font-light">
                User Admin | En Desarrollo...!
            </h1>
            <div className="flex flex-wrap justify-center">
                {users.map((user) => {
                    return (
                        <div
                            className="w-auto group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer"
                            // onClick={(e) => {
                            //     handleClick(e, category);
                            // }}
                        >
                            {/* <div className="inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" /> */}

                            <div className="flex items-start justify-between gap-6 mb-4 group-hover:scale-105 transition-all duration-300">
                                <div className="flex items-center gap-4 text-slate-600">
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

                                <button
                                    id="button-delete"
                                    type="button"
                                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                    // onClick={() => {handleButtonClick(category)}}
                                >
                                    <CircleX className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserAdmin;
