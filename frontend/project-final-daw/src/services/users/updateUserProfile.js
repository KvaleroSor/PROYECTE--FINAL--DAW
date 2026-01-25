/**
 * Actualiza el perfil del usuario autenticado
 * No necesita userId porque el backend lo obtiene del token
 */
const updateUserProfile = async (userData, session) => {
    console.log("🔄 UPDATE USER PROFILE - Service");
    console.log("Datos:", userData);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/users/profile`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                body: JSON.stringify(userData),
            }
        );

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

export default updateUserProfile;
