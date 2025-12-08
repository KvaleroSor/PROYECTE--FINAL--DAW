import { useSession } from "next-auth/react";

const postCategory = async (dataCategory) => {    
    const { data: session } = useSession();

    console.log("🧑🏽‍💻 SESSION USER - ", session?.user);
    console.log("🧑🏽‍💻 SESSION USER ID - ", session?.user.user_id);


    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/categories`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.accesToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: dataCategory.name,
                color: dataCategory.color,
                icon: dataCategory.icon, 
                user_id: session?.user?.user_id,
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
