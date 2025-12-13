const getUsersRole = async (token) => {
    console.log("TOKEN VERIFICATION: ", token);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/admin`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(
            "ERROR - NO SE HA PODIDO HACER FETCH PARA LISTAR LOS USUARIOS CON ROLE USER"
        );
    }

    return await response.json();
};

export default getUsersRole;
