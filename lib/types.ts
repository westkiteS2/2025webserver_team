// lib/types.ts

export interface User {
  email: string
  password: string
  otp: string | null
  verified: boolean
  createdAt: string // ✅ Date → string
}