import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile }) {
    //   if (account?.provider === "google") {
    //     try {
    //       const existingUser = await prisma.user.findUnique({
    //         where: { email: user.email ?? undefined },
    //       })
    //       return true // Always return true to allow sign in
    //     } catch (error) {
    //       console.error("Error in signIn callback:", error)
    //       return false
    //     }
    //   }
    //   return true
    // },
    async signIn({ user, account, profile }) {
      try {
        // Custom logic for sign-in can go here if needed.
        return true; // Allow the sign-in
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Sign-in failed, this will trigger the error page
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }