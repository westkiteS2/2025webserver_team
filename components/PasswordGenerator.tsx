// components/PasswordGenerator.tsx

'use client'

import { generatePassword } from '@/lib/password'

export default function PasswordGenerator({
  onGenerate,
}: {
  onGenerate: (pw: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onGenerate(generatePassword())}
      className="mt-2 px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
    >
      안전한 비밀번호 추천받기
    </button>
  )
}