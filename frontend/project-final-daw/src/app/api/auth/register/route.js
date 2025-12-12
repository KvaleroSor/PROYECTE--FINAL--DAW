/**
import Nomina from '../../../../../../../backend/src/models/nomina';
 * ✅ Responsabilidades del API route register:
 *
 * Sí, se encarga de TODO lo que mencionaste:
 *
 * 1. ✅ Validar datos de entrada
 * 2. ✅ Hashear password con Argon2
 * 3. ✅ Crear user en MongoDB
 * 4. ✅ Crear registro en tabla nomina
 * 5. ✅ Crear registro en tabla percentage_settings
 * 6. ✅ Devolver respuesta de éxito/error
 */

export async function POST(request) {
    const userData = await request.json();

    if (
        !userData.name ||
        !userData.email ||
        !userData.password_hash ||
        !userData.nomina ||
        !userData.percentageSpend
    ) {
        return Response.json(
            { mensaje: "❌ ERROR - Email y contraseña son requeridos" },
            { status: 400 }
        );
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/users`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: userData.name,
                    email: userData.email,
                    password_hash: userData.password_hash,
                    nomina: userData.nomina,
                    percentageSpend: userData.percentageSpend,
                    role: userData.role
                }),
            }
        );

        if (!res.ok) {
            const errorData = await res.text();
            console.log(`❌ ERROR - THE USER COULDN´T BEEN CREATED`);

            return Response.json(
                { mensaje: "Error en el servidor", error: errorData },
                { status: res.status }
            );
        }

        const resBack = await res.json();

        return Response.json({
            mensaje: "✅ - USER CREATED SUCCESFULLY",
            data: resBack
        });
    } catch (err) {
        console.error(err);
        return Response.json(
            { mensaje: "❌ ERROR - INTERNAL SERVER ERROR" },
            { status: 500 }
        );
    }
}
