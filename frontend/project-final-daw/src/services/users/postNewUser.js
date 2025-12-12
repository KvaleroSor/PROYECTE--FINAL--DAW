const postNewUser = async (dataNewUser) => {    

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/users`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: dataNewUser.name,
                email: dataNewUser.email,
                password_hash: dataNewUser.password_hash,
                nomina: dataNewUser.nomina,
                percentageSpend: dataNewUser.percentageSpend,    
                role: dataNewUser.role            
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

export default postNewUser;
