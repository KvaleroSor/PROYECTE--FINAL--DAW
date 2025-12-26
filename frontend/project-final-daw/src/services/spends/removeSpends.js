const removeSpend = async (id, session) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/spends/${id}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {        
        let errorMessage = `HTTP ${res.status} - ${res.statusText}`;

        try {
            const errorData = await res.json();
            console.log("❌ ERROR DATA FROM SERVER:", errorData);
            console.log(
                "❌ ERROR - NO SE HA PODIDO HACER FETCH PARA ELIMINAR EL GASTO | FUNCIÓN REMOVESPENDS"
            );
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

export default removeSpend;
