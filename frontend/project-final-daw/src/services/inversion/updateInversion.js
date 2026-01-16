const updateInversion = async (id, inversionData, session) => {
    console.log("🔄 UPDATE INVERSION - Service");
    console.log("ID:", id);
    console.log("Datos:", inversionData);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/inversion/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                body: JSON.stringify(inversionData),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ Inversión actualizada:", result);
        return result;
    } catch (error) {
        console.error("❌ ERROR al actualizar inversión | Service:", error);
        throw error;
    }
};

export default updateInversion;
