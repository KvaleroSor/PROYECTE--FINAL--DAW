const deleteSaving = async (id, session) => {
    console.log("🗑️ DELETE SAVING - Service");
    console.log("Saving ID:", id);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/savings/${id}`,
            {
                method: "DELETE",
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
        console.log("✅ Saving eliminado:", result);
        return result;
    } catch (error) {
        console.error("❌ ERROR al eliminar saving | Service:", error);
        throw error;
    }
};

export default deleteSaving;
