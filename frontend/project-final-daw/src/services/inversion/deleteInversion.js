const deleteInversion = async (id, session) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/inversion/${id}`,
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
        console.log("✅ Inversión eliminada:", result);
        return result;
    } catch (error) {
        console.error("❌ ERROR al eliminar inversión | Service:", error);
        throw error;
    }
};

export default deleteInversion;
