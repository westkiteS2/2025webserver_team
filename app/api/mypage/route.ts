import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const email = url.searchParams.get('email')

  if (!email) {
    return new NextResponse('이메일이 필요합니다.', { status: 400 })
  }

  await connectDB()

  // MongoDB에서 사용자 정보 조회
  const dbUser = await User.findOne({ email }).select(
    'email createdAt lastLoginAt'
  )

  if (!dbUser) {
    return new NextResponse('사용자를 찾을 수 없습니다.', { status: 404 })
  }

  // ObjectId와 _v 필드를 제거하고 필요한 데이터만 응답
  const userData = {
    email: dbUser.email,
    createdAt: dbUser.createdAt,
    lastLoginAt: dbUser.lastLoginAt,
  }

  return NextResponse.json({ success: true, user: userData })
}
