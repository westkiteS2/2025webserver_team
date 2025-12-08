// /app/api/login/route.ts
import { users } from "@/lib/userStore";

export async function POST(req: Request): Promise<Response> {
  const { email, password } = await req.json();
  if (!email || !password) return new Response("이메일과 비밀번호 필요합니다.", { status: 400 });

  const user = users.find(u => u.email === email);
  if (!user) return new Response("존재하지 않는 이메일입니다.", { status: 404 });
  if (user.password !== password) return new Response("비밀번호가 틀렸습니다.", { status: 401 });
  if (!user.verified) return new Response("이메일 인증이 필요합니다.", { status: 403 });

  return new Response("로그인 성공!", { status: 200 });
}
