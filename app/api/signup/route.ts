// westkites2/.../app/api/signup/route.ts

import { NextResponse } from 'next/server'
import { User } from '@/models/User'
import { connectDB } from '@/lib/mongodb'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return new NextResponse('입력 부족', { status: 400 })
  }

  await connectDB()

  try {
    const exists = await User.findOne({ email })
    if (exists) {
      return new NextResponse('이미 가입된 이메일입니다.', { status: 409 })
    }

    // MongoDB에 사용자 생성 (verified: false, otp: null 상태로 영구 저장)
    await User.create({
      email,
      password,
      name: 'User', // name 필드는 required이므로 임시 값 할당
    })

    return NextResponse.json(
      {
        success: true,
        message: '회원가입 완료. OTP 발급을 시작합니다.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup DB Error:', error)
    return new NextResponse('서버 오류가 발생했습니다.', { status: 500 })
  }
}
