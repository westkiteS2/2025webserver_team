// /app/api/signup/route.ts
import { NextResponse } from "next/server";
import { users } from "@/lib/userStore";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) return new NextResponse("입력 부족", { status: 400 });

  // users 배열에 가입 정보 저장, OTP는 send-otp에서 발급
  users.push({ email, password, otp: null, verified: false });

  console.log(`✅ Signup 완료: ${email}`);
  console.log(users);


  return NextResponse.json({ success: true, message: "회원가입 완료" });
}
