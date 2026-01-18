const getSavings = async (user_id, session) => {
    console.log("🔍 GET SAVINGS - Service");
    console.log("Session Token:", session?.accessToken);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/savings`,
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
        console.log("✅ Savings obtenidos:", result);
        return result;
    } catch (error) {
        console.error("❌ ERROR al obtener savings | Service:", error);
        throw error;
    }
};

export default getSavings;
