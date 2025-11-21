import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";

/**
 * 📝 Anotacions
 *
 * Revisar si dur el session desde la función o desde useSession
 *
 *
 * @param {*} param0
 * @returns
 */

export default async function DashboardLayout({ children }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/");
    }

    return (
        <div className="min-h-screen w-full">
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
                <Sidebar />

                <div className="grid grid-rows-[80px_auto]">
                    <Header />
                    <main className="w-full h-full">
                        {children}
                    </main>                    
                </div>
            </div>
        </div>
    );
}
