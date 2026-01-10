const processMonthlyContributions = async (user_id, savingFromNomina, session) => {
    console.log("💰 PROCESSING MONTHLY CONTRIBUTIONS - Service");
    console.log("User ID:", user_id);
    console.log("Saving from Nomina:", savingFromNomina);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/savings/process-monthly/${user_id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                body: JSON.stringify({ savingFromNomina }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ Monthly contributions processed:", result);
        return result;
    } catch (error) {
        console.error("❌ ERROR processing monthly contributions | Service:", error);
        throw error;
    }
};

export default processMonthlyContributions;
