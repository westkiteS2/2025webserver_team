"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"signup" | "verify">("signup");

  const router = useRouter();

  // 1️⃣ 가입 + OTP 발급
  const handleSignup = async () => {
    const resSignup = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!resSignup.ok) return alert("가입 실패");

    const resOtp = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!resOtp.ok) return alert("OTP 발급 실패");

    const data = await resOtp.json();
    console.log("테스트용 OTP:", data.otp);

    setStep("verify");
  };

  // 2️⃣ OTP 인증
  const handleVerify = async () => {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    if (!res.ok) return alert("OTP 인증 실패");

    router.push("/signup/complete");
  };

  return (
    <div>
      {step === "signup" ? (
        <div>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일" />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호" type="password" />
          <button onClick={handleSignup}>가입하기</button>
        </div>
      ) : (
        <div>
          <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="OTP 입력" />
          <button onClick={handleVerify}>인증하기</button>
        </div>
      )}
    </div>
  );
}
