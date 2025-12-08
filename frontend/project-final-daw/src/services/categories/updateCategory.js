const updateCategory = async (id, dataCategory, session) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/categories/${id}`,
        {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: dataCategory.name,
                color: dataCategory.color,
                icon: dataCategory.icon,
            }),
        }
    );

    if (!res.ok) {
        throw new Error(
            
        );
    }

    console.log("📡 Response status:", res.status);
    console.log("📡 Response ok:", res.ok);

    if (!res.ok) {
        // Intentar obtener el mensaje de error del servidor
        let errorMessage = `HTTP ${res.status} - ${res.statusText}`;

        try {
            const errorData = await res.json();
            console.log("❌ ERROR DATA FROM SERVER:", errorData);
            console.log("❌ ERROR - NO SE HA PODIDO HACER FETCH PARA ACTUALIZAR LA CATEGORÍA | FUNCIÓN UPDATECATEGORY");
            errorMessage += ` - ${
                errorData.message ||
                errorData.error ||
                JSON.stringify(errorData)
            }`;
        } catch (e) {
            console.log("❌ No se pudo parsear el error del servidor");
        }

        throw new Error(errorMessage);
    }
    return await res.json();
};

export default updateCategory;
