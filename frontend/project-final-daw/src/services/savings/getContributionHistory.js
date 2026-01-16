const getContributionHistory = async (user_id, session) => {
    try {
        const response = await fetch(
            `http://localhost:5002/api/savings/contribution-history/${user_id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session?.accessToken}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.mensaje || "Error al obtener historial de contribuciones");
        }

        const data = await response.json();
        return data.data;
    } catch (err) {
        console.error("❌ Error al obtener historial de contribuciones:", err);
        throw err;
    }
};

export default getContributionHistory;
