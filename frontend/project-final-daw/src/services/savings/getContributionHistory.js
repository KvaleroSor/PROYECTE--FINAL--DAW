const getContributionHistory = async (session) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/savings/contribution-history`,
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
