const getInversions = async (session) => {
    console.log("🔍 GET INVERSIONS - Service");
    console.log("Session Token:", session?.accessToken);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/inversion/`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ Inversiones obtenidas:", result);
        return result;
    } catch (error) {
        console.error("❌ ERROR al obtener inversiones | Service:", error);
        throw error;
    }
};

export default getInversions;
