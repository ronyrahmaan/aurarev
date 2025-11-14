"use server"

import { signIn } from "./auth"
import { AuthError } from "next-auth"

export async function authenticateUser(email: string, password: string) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    return { success: true, result }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'Invalid credentials' }
        default:
          return { success: false, error: 'Something went wrong' }
      }
    }
    return { success: false, error: 'Something went wrong' }
  }
}