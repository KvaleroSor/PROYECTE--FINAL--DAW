import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        Credentials({
            async authorize(credentials) {
                console.log("🚀 AUTHORIZE FUNCTION CALLED"); // Test básico
                console.log("📧 Email:", credentials.email);

                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/users/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                const data = await res.json();

                // 🔍 DEBUGGING - Ver qué devuelve el backend
                console.log("Backend status:", res.status);
                console.log("Backend response:", data);

                if (res.ok && data) {
                    return {
                        id: data.id,
                        email: data.email,
                        name: data.name,
                        token: data.token,
                        role: data.role,
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log("🔑 JWT CALLBACK - User received:", user);
            console.log("🔑 JWT CALLBACK - Token before:", token);

            if (user?.token) {
                token.accessToken = user.token;
                // Guardar información del usuario en el token
                token.user_id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.role = user.role;
            }

            console.log("🔑 JWT CALLBACK - Token after:", token);
            return token;
        },
        async session({ session, token }) {
            console.log("📋 SESSION CALLBACK - Token received:", token);
            console.log("📋 SESSION CALLBACK - Session before:", session);

            // Pasar el token y la información del usuario a la sesión
            session.accessToken = token.accessToken;
            session.user.user_id = token.user_id;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.role = token.role;

            console.log("📋 SESSION CALLBACK - Session after:", session);
            return session;
        },
    },

    pages: {
        signIn: "/",
    },

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
