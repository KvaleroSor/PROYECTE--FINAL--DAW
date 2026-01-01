const getSpendsByCategory = async (category_id, session) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/spends/type/:category_type`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        // Intentar obtener el mensaje de error del servidor
        let errorMessage = `HTTP ${res.status} - ${res.statusText}`;

        try {
            const errorData = await res.json();
            console.log("❌ ERROR DATA FROM SERVER:", errorData);
            console.log(
                "❌ ERROR - NO SE HA PODIDO HACER FETCH PARA LISTAR LAS CATEGORÍAS"
            );
            console.log("SESSION - SESSION - ", session);
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

export default getSpendsByCategory;
