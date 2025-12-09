import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { User } from '@/models/User'

export async function POST(req: Request) {
  const { email } = await req.json()

  await connectDB()

  // MongoDB에서 사용자 찾기
  const user = await User.findOne({ email })

  if (!user) return new NextResponse('사용자를 찾을 수 없어.', { status: 404 })

  // OTP 생성 및 DB에 저장
  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  user.otp = otp
  user.verified = false // OTP 재발급 시 인증 상태 초기화
  await user.save() // 변경 사항 저장

  console.log(`📨 OTP 발급 (테스트용): ${otp} for ${email}`)

  return NextResponse.json({ success: true, otp }) // 테스트용 OTP 반환
}
