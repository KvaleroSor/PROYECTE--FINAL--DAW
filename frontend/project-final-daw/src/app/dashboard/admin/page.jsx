import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAdmin from "./UserAdmin.jsx";
import Body from "./../components/Body.jsx";
import { redirect } from "next/navigation";

export default function DashboardPage() {
    const session = getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    if (session.user.role === "admin") {
        return <UserAdmin />;
    }

    return <Body />;
}
