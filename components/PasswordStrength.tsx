// components/PasswordStrength.tsx

'use client'

import { analyzePassword } from '@/lib/password'
import { useMemo } from 'react'

interface Props {
  password: string
}

export default function PasswordStrength({ password }: Props) {
  const result = useMemo(() => {
    if (!password) return null
    return analyzePassword(password)
  }, [password])

  if (!result) return null

  return (
    <div className="mt-3 text-sm space-y-1">
      <p>
        강도: <b>{result.simpleLabel}</b> / {result.detailLabel}
      </p>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className="h-2 rounded transition-all"
          style={{
            width: `${(result.score + 1) * 20}%`,
            backgroundColor: [
              '#dc2626',
              '#ea580c',
              '#eab308',
              '#22c55e',
              '#16a34a',
            ][result.score],
          }}
        />
      </div>
      <p className="text-xs text-gray-500">
        예상 해킹 시간: {result.crackTime}
      </p>
    </div>
  )
}