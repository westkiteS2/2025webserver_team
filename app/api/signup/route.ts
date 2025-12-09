// /app/api/signup/route.ts
import { NextResponse } from "next/server";
import { users } from "@/lib/userStore";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new NextResponse("입력 부족", { status: 400 });
  }

  // 1️⃣ MongoDB 연결
  await connectDB();

  // 2️⃣ DB 중복 체크 (추가)
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse("이미 가입된 이메일", { status: 409 });
  }

  // 3️⃣ MongoDB에 사용자 저장 (추가)
  await User.create({
    email,
    password,      // 지금은 평문
    isVerified: false,
  });

  // 4️⃣ 기존 메모리 저장소 유지 (절대 건드리지 않음)
  users.push({
    email,
    password,
    otp: null,
    verified: false,
  });

  console.log(`✅ Signup 완료: ${email}`);
  console.log("📦 Memory users:", users);
  console.log("🗄️ MongoDB에 저장됨");

  return NextResponse.json({
    success: true,
    message: "회원가입 완료",
  });
}
