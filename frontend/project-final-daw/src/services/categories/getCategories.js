const getCategories = async () => {
    const res = await fetch(
        `${process.env.URI_BACKEND_DEPLOYED}/api/categories`,
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
