// app/layout.tsx

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import SiteHeader from '@/components/layout/SiteHeader'

export const metadata: Metadata = {
  title: '보안형 독서 리뷰 플랫폼',
  description: '도서 리뷰, 토론, 투표까지 가능한 독서 커뮤니티 플랫폼',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (    
      <html lang="ko">
        <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
          <SiteHeader />

          <main className="flex justify-center pt-10 pb-20">
            <div className="layout-wrapper w-full max-w-5xl px-6">{children}</div>
          </main>
        </body>
      </html>
  )
}
