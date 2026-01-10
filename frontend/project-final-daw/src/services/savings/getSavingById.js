const getSavingById = async (id, session) => {
    console.log("🔍 GET SAVING BY ID - Service");
    console.log("Saving ID:", id);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/savings/goal/${id}`,
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
        console.log("✅ Saving obtenido:", result);
        return result;
    } catch (error) {
        console.error("❌ ERROR al obtener saving | Service:", error);
        throw error;
    }
};

export default getSavingById;
