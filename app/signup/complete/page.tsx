// app/signup/complete/page.tsx

import Link from 'next/link'

export default function SignupCompletePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          가입이 완료되었습니다 🎉
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          이메일 인증 및 회원가입이 완료되었습니다.
        </p>

        <div className="space-y-3">
          <Link
            href="/login"
            className="block w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            로그인하러 가기
          </Link>

          <Link
            href="/"
            className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  )
}