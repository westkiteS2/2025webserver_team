// /app/api/verify-otp/route.ts
import { NextResponse } from "next/server";
import { users } from "@/lib/userStore";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return new NextResponse("이메일과 OTP 필요", { status: 400 });
  }

  console.log("📥 verify-otp 요청:", { email, otp });
  console.log("🧠 users 현재 상태:", users);

  // 1️⃣ 메모리에서 사용자 찾기 (기존)
  let user = users.find(u => u.email === email && !u.verified);

  // 🔹 추가: 메모리에 없을 경우 DB 확인
  if (!user) {
    console.log("⚠️ 메모리 유저 없음 → DB 확인");

    await connectDB();
    const dbUser = await User.findOne({ email });

    if (!dbUser) {
      return new NextResponse("인증 요청이 없어.", { status: 404 });
    }

    /*
      ⚠️ 여기서 중요한 사실:
      DB에는 otp가 없기 때문에
      '이미 인증된 사용자'인지 여부만 체크
    */
    if (dbUser.isVerified) {
      return NextResponse.json({
        success: true,
        message: "이미 인증된 사용자",
      });
    }

    return new NextResponse(
      "OTP 정보가 만료되었어. 다시 요청해줘.",
      { status: 410 }
    );
  }

  // 2️⃣ OTP 비교 (기존, 안전)
  if (String(user.otp) !== String(otp)) {
    return new NextResponse("OTP가 틀렸어.", { status: 401 });
  }

  // 3️⃣ 메모리 상태 변경 (기존)
  user.verified = true;
  user.otp = null;

  // 4️⃣ MongoDB에도 인증 완료 기록 (기존)
  await connectDB();
  await User.findOneAndUpdate(
    { email },
    { isVerified: true }
  );

  console.log(`✅ OTP 인증 성공: ${email}`);
  console.log("🧠 Memory verified ✅");
  console.log("🗄️ MongoDB isVerified ✅");

  return NextResponse.json({
    success: true,
    message: "이메일 인증 완료",
  });
}
