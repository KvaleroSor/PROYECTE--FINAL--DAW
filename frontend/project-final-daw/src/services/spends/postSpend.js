const postSpend = async (dataSpend, session) => {
    console.log("🚀 INICIANDO POST SPEND SERVICE");
    console.log("📋 dataSpend recibida:", dataSpend);
    console.log("🔐 session recibida:", session);
    console.log("🧑🏽‍💻 SESSION USER - ", session?.user);
    console.log("🧑🏽‍💻 SESSION USER ID - ", session?.user?.user_id);
    console.log("🔑 ACCESS TOKEN - ", session?.accessToken);
    
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/spends`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                category_id: dataSpend.category_id,
                description: dataSpend.description,
                amount: dataSpend.amount,
                date: dataSpend.date,
                payment_type: dataSpend.payment_type,
                user_id: session?.user?.user_id,
            }),
        }
    );

    console.log("📡 Response status:", res.status);
    console.log("📡 Response ok:", res.ok);

    if (!res.ok) {       
        let errorMessage = `HTTP ${res.status} - ${res.statusText}`;
        
        try {
            const errorData = await res.json();
            console.log("❌ ERROR DATA FROM SERVER:", errorData);
            errorMessage += ` - ${errorData.message || errorData.error || JSON.stringify(errorData)}`;
        } catch (e) {
            console.log("❌ No se pudo parsear el error del servidor");
        }
        
        throw new Error(errorMessage);
    }
    return await res.json();
};

export default postSpend;
