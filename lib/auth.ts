import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/db"

const authConfig = {
  debug: process.env.NODE_ENV === 'development',
  trustHost: true,
  csrf: true,
  basePath: "/api/auth",
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

          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            businessName: user.businessName || "",
            plan: user.plan
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      // If this is the first time (user just signed in)
      if (user) {
        token.id = user.id
        token.businessName = user.businessName
        token.plan = user.plan
        token.iat = Math.floor(Date.now() / 1000)
        token.exp = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 days from now
      }

      // Return previous token if the access token has not expired yet
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id as string
        session.user.businessName = token.businessName as string
        session.user.plan = token.plan as string
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