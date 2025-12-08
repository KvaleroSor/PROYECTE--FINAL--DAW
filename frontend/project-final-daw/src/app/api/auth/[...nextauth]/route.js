import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/users/login`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    }
                );

                const data = await res.json();

                if (res.ok && data.user) {
                    return {
                        id: data.user._id,
                        email: data.user.email,
                        name: data.user.name,
                        token: data.token, 
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {            
            if (user?.token) {
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            // Pasar el token a la sesión
            session.accessToken = token.accessToken;
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
