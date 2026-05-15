const changeNickname = async (newName, accessToken) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/change-nickname`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                newName,
            }),
        });

        // Verificar si la respuesta es JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("El servidor no está disponible. Por favor, intenta más tarde.");
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensaje || "Error al cambiar el nombre");
        }

        return data;
    } catch (error) {
        console.error("Error en changeNickname:", error);
        throw error;
    }
};

export default changeNickname;
