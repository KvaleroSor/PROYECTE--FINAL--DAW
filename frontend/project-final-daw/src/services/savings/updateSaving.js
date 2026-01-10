const updateSaving = async (id, updateData, session) => {
    console.log("🔄 UPDATE SAVING - Service");
    console.log("Saving ID:", id);
    console.log("Update Data:", updateData);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/savings/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                body: JSON.stringify(updateData),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ Saving actualizado:", result);
        return result;
    } catch (error) {
        console.error("❌ ERROR al actualizar saving | Service:", error);
        throw error;
    }
};

export default updateSaving;
