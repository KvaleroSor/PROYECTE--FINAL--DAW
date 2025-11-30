const postCategory = async (dataCategory) => {    
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/categories`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: dataCategory.name,
                color: dataCategory.color,
                icon: dataCategory.icon, 
                user_id: dataCategory.user_id
            }),
        }
    );

    if (!res.ok) {
        throw new Error(
            "ERROR - NO SE HA PODIDO HACER FETCH PARA CREAR LA CATEGORÍA"
        );
    }
    return await res.json();
};

export default postCategory;
