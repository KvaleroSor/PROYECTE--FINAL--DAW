const updateCategory = async (id, dataCategory) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/categories/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: dataCategory.name,
                color: dataCategory.color,
                icon: dataCategory.icon,
            }),
        }
    );

    if (!res.ok) {
        throw new Error(
            "ERROR - NO SE HA PODIDO HACER FETCH PARA ACTUALIZAR LA CATEGORÍA | FUNCIÓN UPDATECATEGORY"
        );
    }
    return await res.json();
};

export default updateCategory;
