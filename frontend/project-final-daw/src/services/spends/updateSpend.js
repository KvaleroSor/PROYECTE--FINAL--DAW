const updateSpend = async (id, dataSpend, session) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/spends/${id}`,
        {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                category_id: dataSpend.category_id,
                description: dataSpend.description,
                amout: dataSpend.amout,
                date: dataSpend.date,
                payment_type: dataSpend.payment_type,                
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
            console.log("❌ ERROR - NO SE HA PODIDO HACER FETCH PARA ACTUALIZAR EL GASTO | FUNCIÓN UPDATESPENDS");
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

export default updateSpend;
