
// import NextAuth from "next-auth"
// import type { NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async signIn() {
//       try {
//         // Custom logic for sign-in can go here if needed.
//         return true // Allow the sign-in
//       } catch (error) {
//         console.error("Error during sign-in:", error)
//         return false // Sign-in failed, this will trigger the error page
//       }
//     },
//   },
//   pages: {
//     signIn: '/auth/signin',
//     error: '/',
//   },
//   debug: process.env.NODE_ENV === 'development',
//   secret: process.env.NEXTAUTH_SECRET,
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }


// app/api/auth/[...nextauth]/route.ts

import { authOptions } from "@/app/lib/auth"
import NextAuth from "next-auth"

const handler = NextAuth({
  ...authOptions,
  callbacks: {
    ...authOptions.callbacks,
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
})

export { handler as GET, handler as POST }