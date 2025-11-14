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
      async authorize(credentials: any) {
        console.log('🔐 NextAuth credentials provider called');
        console.log('📧 Email:', credentials?.email);
        console.log('🔑 Password provided:', !!credentials?.password);

        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing email or password');
          return null
        }

        try {
          console.log('🔍 Looking up user in database...');
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string
            }
          })

          if (!user) {
            console.log('❌ User not found for email:', credentials.email);
            return null
          }

          console.log('✅ User found:', user.email);

          if (!user.passwordHash) {
            console.log('❌ User has no password hash');
            return null
          }

          console.log('🔒 Comparing passwords...');
          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash
          )

          console.log('🔑 Password match result:', passwordMatch);

          if (!passwordMatch) {
            console.log('❌ Password does not match');
            return null
          }

          console.log('✅ Login successful for user:', user.email);
          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            businessName: user.businessName || "",
            plan: user.plan
          }
        } catch (error) {
          console.error("❌ Auth error:", error)
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
      }
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