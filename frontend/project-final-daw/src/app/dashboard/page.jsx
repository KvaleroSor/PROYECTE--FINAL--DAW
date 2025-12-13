import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Body from "./components/Body.jsx";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    if (session?.user?.role === "admin") {
        redirect("/dashboard/admin");
    }
    return <Body />;
}
