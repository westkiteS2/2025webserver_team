import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req: Request) {
  const { name, email, password, supabaseId } = await req.json();

  if (!name || !email || !password) {
    return new NextResponse("필수 정보가 부족해.", { status: 400 });
  }

  await connectDB();

  const exists = await User.findOne({ email });
  if (exists) {
    return new NextResponse("이미 가입된 이메일이야.", { status: 409 });
  }

  await User.create({
    name,
    email,
    password, // ⚠️ 지금은 plain, 나중에 bcrypt
    supabaseId,
  });

  return NextResponse.json({ success: true });
}
