const getUserData = async (userId, session) => {
    console.log("🚀 GET USER FINANCIAL DATA SERVICE");
    console.log("👤 User ID:", userid);
    console.log("🔐 Session:", session);
    console.log("🔑 Access Token:", session?.accessToken);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/users/${userId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );
    if (!res.ok) {
        throw new Error(
            "ERROR - NO SE HA PODIDO HACER FETCH PARA OBTENER DATOS FINANCIEROS"
        );
    }
    return await res.json();
};

export default getUserData;
