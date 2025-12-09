// lib/otpStore.ts

export type OtpRecord = {
  email: string
  otp: string
  expiresAt: number
  verified: boolean
}

export const otpStore: OtpRecord[] = []