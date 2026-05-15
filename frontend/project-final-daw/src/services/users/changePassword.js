const changePassword = async (currentPassword, newPassword, accessToken) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/change-password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
            }),
        });

        // Verificar si la respuesta es JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("El servidor no está disponible. Por favor, intenta más tarde.");
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensaje || "Error al cambiar la contraseña");
        }

        return data;
    } catch (error) {
        console.error("Error en changePassword:", error);
        throw error;
    }
};

export default changePassword;
