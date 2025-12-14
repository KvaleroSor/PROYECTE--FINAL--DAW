"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getUsersRole from "./../../../services/admin/getUsersRole.js";
import GraficUsers from "./components/GraficUsers.jsx";
import GeneralMetrics from "./components/GeneralMetrics.jsx";
import UserRegisteredCategories from "./components/UsersRegisteredCategories.jsx";

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
            {/* <h1 className="text-4xl font-light">
                User Admin | En Desarrollo...!
            </h1> */}
            <div className="w-full p-5">
                <GeneralMetrics data={users}/>
            </div>            
            <div className="w-full p-5">
                <GraficUsers data={users} />
            </div>
            
            <div className="w-full p-5">
                <UserRegisteredCategories data={users} />
            </div>
        </div>
    );
};

export default UserAdmin;
