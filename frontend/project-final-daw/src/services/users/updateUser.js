const updateUser = async (userId, userData, session) => {
    console.log("🔄 UPDATE USER - Service");
    console.log("User ID:", userId);
    console.log("Datos:", userData);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ Usuario actualizado:", result);
        return result;
    } catch (error) {
        console.error("❌ ERROR al actualizar usuario | Service:", error);
        throw error;
    }
};

export default updateUser;
