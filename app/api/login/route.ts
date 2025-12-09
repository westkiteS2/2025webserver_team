import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { User } from '@/models/User'

export async function POST(req: Request): Promise<Response> {
  const { email, password } = await req.json()

  if (!email || !password) {
    return new Response('이메일과 비밀번호 필요합니다.', { status: 400 })
  }

  await connectDB()

  try {
    // MongoDB에서 사용자 찾기
    const user = await User.findOne({ email })

    if (!user)
      return new Response('존재하지 않는 이메일입니다.', { status: 404 })
    if (user.password !== password)
      return new Response('비밀번호가 틀렸습니다.', { status: 401 })
    if (!user.verified)
      return new Response('이메일 인증이 필요합니다.', { status: 403 })

    // 로그인 성공 (DB에서 영구적으로 사용자를 찾았음)
    return new Response('로그인 성공!', { status: 200 })
  } catch (error) {
    console.error('Login DB Error:', error)
    return new Response('서버 오류가 발생했습니다.', { status: 500 })
  }
}
