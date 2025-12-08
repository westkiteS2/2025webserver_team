// /app/api/send-otp/route.ts
import { NextResponse } from "next/server";
import { users } from "@/lib/userStore";

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = users.find(u => u.email === email);

  if (!user) return new NextResponse("사용자를 찾을 수 없어.", { status: 404 });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.verified = false;

  console.log(`📨 OTP 발급 (테스트용): ${otp} for ${email}`);

  return NextResponse.json({ success: true, otp }); // 테스트용 OTP 반환
}
