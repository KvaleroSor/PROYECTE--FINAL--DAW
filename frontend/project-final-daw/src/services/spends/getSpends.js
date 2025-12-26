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

    console.log("📡 Response status:", res.status);
    console.log("📡 Response ok:", res.ok);

    if (!res.ok) {
        let errorMessage = `HTTP ${res.status} - ${res.statusText}`;
        
        try {
            const errorData = await res.json();
            console.log("❌ ERROR DATA FROM SERVER:", errorData);
            errorMessage += ` - ${errorData.mensaje || errorData.message || errorData.error || JSON.stringify(errorData)}`;
        } catch (e) {
            console.log("❌ No se pudo parsear el error del servidor");
        }
        
        throw new Error(errorMessage);
    }
    return await res.json();
};

export default getSpends;
