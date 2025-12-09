// app/api/reviews/route.ts
import { NextResponse } from 'next/server'

let reviewDB: any[] = [] // 서버 메모리에 저장 (DB 없을 경우)

export async function POST(req: Request) {
  const body = await req.json()

  const newReview = {
    id: Date.now().toString(),
    bookId: body.bookId,
    nickname: body.nickname,
    rating: Number(body.rating),
    content: body.content,
    createdAt: new Date().toISOString(),
  }

  reviewDB.push(newReview)

  return NextResponse.json({ success: true, review: newReview })
}

export async function GET() {
  return NextResponse.json(reviewDB)
}
