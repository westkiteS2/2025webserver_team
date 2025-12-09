// lib/password.ts

import zxcvbn from 'zxcvbn'

export interface PasswordAnalysis {
  score: number
  simpleLabel: '상' | '중' | '하'
  detailLabel: '매우 높음' | '높음' | '보통' | '낮음' | '매우 낮음'
  crackTime: string
}

export function analyzePassword(password: string): PasswordAnalysis {
  const result = zxcvbn(password)
  const score = result.score

  return {
    score,
    simpleLabel: ['하', '하', '중', '상', '상'][
      score
    ] as PasswordAnalysis['simpleLabel'],
    detailLabel: ['매우 낮음', '낮음', '보통', '높음', '매우 높음'][
      score
    ] as PasswordAnalysis['detailLabel'],
    crackTime: String(
      result.crack_times_display?.offline_slow_hashing_1e4_per_second ??
        '알 수 없음'
    ),
  }
}

export function generatePassword(): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  return Array.from(
    { length: 14 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('')
}