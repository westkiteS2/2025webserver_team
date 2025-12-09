import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { User } from '@/models/User'

export async function POST(req: Request) {
  const { email, otp } = await req.json()
  if (!email || !otp)
    return new NextResponse('이메일과 OTP 필요', { status: 400 })

  await connectDB()

  // 1. MongoDB에서 사용자 찾기
  const user = await User.findOne({ email })

  if (!user) return new NextResponse('인증 요청이 없어.', { status: 404 })

  // 2. OTP 확인
  if (user.otp !== otp)
    return new NextResponse('OTP가 틀렸어.', { status: 401 })

  // 3. 인증 성공 및 DB 업데이트
  user.verified = true
  user.otp = null
  await user.save() // 변경 사항 저장

  return NextResponse.json({ success: true, message: '이메일 인증 완료' })
}
