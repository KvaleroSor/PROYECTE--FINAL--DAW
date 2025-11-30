const getCategories = async (userid) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/categories/user/${userid}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error(
            "ERROR - NO SE HA PODIDO HACER FETCH PARA LISTAR LAS CATEGORÍA"
        );
    }
    return await res.json();
};

export default getCategories;
