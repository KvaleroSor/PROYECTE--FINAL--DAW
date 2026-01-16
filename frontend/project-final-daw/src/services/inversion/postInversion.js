const postInversion = async (inversionData, session) => {
    console.log("🚀 POST INVERSION - Service");
    console.log("Datos:", inversionData);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/inversion`,
            {
                method: "POST",
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
        console.log("✅ Inversión creada:", result);
        return result;
    } catch (error) {
        console.error("❌ ERROR al crear inversión | Service:", error);
        throw error;
    }
};

export default postInversion;
