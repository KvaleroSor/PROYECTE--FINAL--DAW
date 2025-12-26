const getSpends = async (userid, session) => {
    console.log("🚀 GET SPENDS SERVICE");
    console.log("👤 User ID:", userid);
    console.log("🔐 Session:", session);
    console.log("🔑 Access Token:", session?.accessToken);
    
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/spends/user/${userid}`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error(
            "ERROR - NO SE HA PODIDO HACER FETCH PARA LISTAR LOS GASTOS"
        );
    }
    return await res.json();
};

export default getSpends;
