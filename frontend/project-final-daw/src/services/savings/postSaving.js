const postSaving = async (newSaving, session) => {
    console.log("🚀 POST SAVING - Service");
    console.log("Data:", newSaving);
    console.log("Session Token:", session?.accessToken);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/savings`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                body: JSON.stringify(newSaving),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ Saving creado:", result);
        return result;
    } catch (error) {
        console.error("❌ ERROR al crear saving | Service:", error);
        throw error;
    }
};

export default postSaving;
