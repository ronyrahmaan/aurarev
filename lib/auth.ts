import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/db"

const authConfig = {
  debug: process.env.NODE_ENV === 'development',
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string
            }
          })

          if (!user || !user.passwordHash) {
            return null
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash
          )

          if (!passwordMatch) {
            return null
          }

          // Check if email is verified
          if (!user.emailVerifiedAt || !user.isActive) {
            // Return a special error that can be handled by the client
            throw new Error("EMAIL_NOT_VERIFIED")
          }

          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            businessName: user.businessName || "",
            plan: user.plan,
            emailVerified: !!user.emailVerifiedAt,
            isActive: user.isActive
          }
        } catch (error) {
          console.error("Auth error:", error)
          // Re-throw email verification errors so they can be handled specifically
          if (error instanceof Error && error.message === "EMAIL_NOT_VERIFIED") {
            throw error
          }
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id
        token.businessName = user.businessName
        token.plan = user.plan
        token.emailVerified = user.emailVerified
        token.isActive = user.isActive
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id as string
        session.user.businessName = token.businessName as string
        session.user.plan = token.plan as string
        session.user.emailVerified = token.emailVerified as boolean
        session.user.isActive = token.isActive as boolean
      }
      return session
    }
  },
  pages: {
    signIn: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)