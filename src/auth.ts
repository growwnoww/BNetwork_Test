import NextAuth from "next-auth";
import { db } from "./db/db";
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from "./auth.config";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async session({ session, token }) {
         
            // Check if token has wallet_address and isRegistered
            if (token.wallet_address) {
                // Safely add properties to the session.user object
                session.user = {
                    ...session.user,
                    wallet_address: token.wallet_address as string,
                    isRegistered: token.isRegistered as boolean,
                };
            }

            console.log("Session after modification:", session);
            return session;
        },
        async jwt({ token, user }) {
            console.log("JWT callback triggered");
            console.log("Token before modification:", token);

            if (user && typeof (user as any).wallet_address === "string") {
                token.wallet_address = (user as any).wallet_address;
                token.isRegistered = (user as any).isRegistered;
                console.log("Token after modification:", token);
            }

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig
});
