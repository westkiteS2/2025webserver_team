// /app/api/verify-otp/route.ts

import { NextResponse } from 'next/server'
import { users } from '@/lib/userStore'

export async function POST(req: Request) {
  const { email, otp } = await req.json()
  if (!email || !otp)
    return new NextResponse('이메일과 OTP 필요', { status: 400 })

  const user = users.find((u) => u.email === email && !u.verified)
  if (!user) return new NextResponse('인증 요청이 없어.', { status: 404 })

  if (user.otp !== otp)
    return new NextResponse('OTP가 틀렸어.', { status: 401 })

  user.verified = true
  user.otp = null

  return NextResponse.json({ success: true, message: '이메일 인증 완료' })
}