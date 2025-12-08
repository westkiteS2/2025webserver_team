"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [showSignupSuggestion, setShowSignupSuggestion] =
    useState<boolean>(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);
    setMessage("");
    setShowSignupSuggestion(false);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();

      if (!res.ok) {
        setMessage(text);

        // ✅ 없는 이메일인 경우만 회원가입 제안
        if (res.status === 404) {
          setShowSignupSuggestion(true);
        }

        setLoading(false);
        return;
      }

      // 로그인 성공
      router.push("/");
    } catch (err) {
      setMessage("잠시만 기다려 주십시오.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="w-96 bg-white p-6 rounded-xl shadow space-y-4">
        <h1 className="text-xl font-semibold text-center">로그인</h1>

        <input
          type="email"
          placeholder="이메일"
          className="w-full border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="비밀번호"
          className="w-full border rounded px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {message && (
          <p className="text-sm text-red-500 text-center">{message}</p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2 rounded bg-black text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "확인 중…" : "로그인"}
        </button>

        {/* 🌱 회원가입 제안 */}
        {showSignupSuggestion && (
          <div className="pt-4 text-center text-sm text-gray-600">
            <p>아직 계정이 없습니다.</p>
            <button
              onClick={() => router.push("/signup")}
              className="mt-2 underline text-black hover:text-gray-700"
            >
              회원가입을 통해 더 많은 정보를 확인하세요!
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
