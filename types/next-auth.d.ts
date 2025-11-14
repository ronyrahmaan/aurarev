import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      businessName: string
      plan: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    businessName: string
    plan: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    businessName: string
    plan: string
  }
}