import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserAdmin from "./UserAdmin.jsx";
import { redirect } from "next/navigation";

export default async function DashboardPage({ params }) {
    const session = await getServerSession(authOptions);
    const { locale } = await params;

    if (!session) {
        redirect(`/${locale}`);
    }

    if (session?.user?.role !== "admin") {
        redirect(`/${locale}/dashboard`);
    }

    return <UserAdmin />;
}
