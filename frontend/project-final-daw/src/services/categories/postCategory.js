const postCategory = async (dataCategory, session) => {
    console.log("🚀 INICIANDO POSTCATEGORY SERVICE");
    console.log("📋 dataCategory recibida:", dataCategory);
    console.log("🔐 session recibida:", session);
    console.log("🧑🏽‍💻 SESSION USER - ", session?.user);
    console.log("🧑🏽‍💻 SESSION USER ID - ", session?.user?.user_id);
    console.log("🔑 ACCESS TOKEN - ", session?.accessToken);
    
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/categories`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: dataCategory.name,
                color: dataCategory.color,
                icon: dataCategory.icon,
                user_id: session?.user?.user_id,
            }),
        }
    );

    console.log("📡 Response status:", res.status);
    console.log("📡 Response ok:", res.ok);

    if (!res.ok) {
        throw new Error(
            "ERROR - NO SE HA PODIDO HACER FETCH PARA CREAR LA CATEGORÍA"
        );
    }
    return await res.json();
};

export default postCategory;
