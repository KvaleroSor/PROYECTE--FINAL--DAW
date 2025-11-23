const removeCategory = async (id) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/categories/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error(
            "ERROR - NO SE HA PODIDO HACER FETCH PARA ELIMINAR LA CATEGORÍA"
        );
    }
    return await res.json();
};

export default removeCategory;
