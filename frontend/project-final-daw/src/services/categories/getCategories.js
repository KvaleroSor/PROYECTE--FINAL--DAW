const getCategories = async (userid, session) => {
    console.log("🚀 GET CATEGORIES SERVICE");
    console.log("👤 User ID:", userid);
    console.log("🔐 Session:", session);
    console.log("🔑 Access Token:", session?.accessToken);
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/categories`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error(
                "ERROR - NO SE HA PODIDO HACER FETCH PARA LISTAR LAS CATEGORÍA"
            );
        }
        return await res.json();
    } catch (err) {
        console.error("ERROR - SERVICE", err);
    }
};

export default getCategories;
