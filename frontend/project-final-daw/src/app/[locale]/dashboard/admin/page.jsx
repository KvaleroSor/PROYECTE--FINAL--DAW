import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserAdmin from "./UserAdmin.jsx";
import { redirect } from "@/i18n/navigation";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/");
    }

    if (session?.user?.role !== "admin") {
        redirect("/dashboard");
    }

    return <UserAdmin />;
}
