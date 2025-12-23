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
                "Authorization": `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: dataCategory.name,
                monthly_budget: dataCategory.monthly_budget,
                total_acumulated: dataCategory.total_acumulated,
                color: dataCategory.color,
                icon: dataCategory.icon,
                user_id: session?.user?.user_id,
            }),
        }
    );

    console.log("📡 Response status:", res.status);
    console.log("📡 Response ok:", res.ok);

    if (!res.ok) {
        // Intentar obtener el mensaje de error del servidor
        let errorMessage = `HTTP ${res.status} - ${res.statusText}`;
        
        try {
            const errorData = await res.json();
            console.log("❌ ERROR DATA FROM SERVER:", errorData);
            errorMessage += ` - ${errorData.message || errorData.error || JSON.stringify(errorData)}`;
        } catch (e) {
            console.log("❌ No se pudo parsear el error del servidor");
        }
        
        throw new Error(errorMessage);
    }
    return await res.json();
};

export default postCategory;
