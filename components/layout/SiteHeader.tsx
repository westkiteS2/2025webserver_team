// components/layout/SiteHeader.tsx

'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type UserInfo = {
  email: string
  name: string
}

const navItems = [
  { label: '홈', href: '/' },
  { label: '도서', href: '/books' },
  { label: '커뮤니티', href: '/community' },
  { label: '마이페이지', href: '/mypage' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    const loadUser = () => {
      const email = localStorage.getItem('userEmail')
      const name = localStorage.getItem('userName')

      if (email) {
        setUser({
          email,
          name: name || email.split('@')[0],
        })
      } else {
        setUser(null)
      }
    }

    loadUser() // 최초 1회

    // ✅ 로그인/로그아웃 이벤트 감지
    window.addEventListener('auth-change', loadUser)

    return () => {
      window.removeEventListener('auth-change', loadUser)
    }
  }, [])


  const handleLogout = () => {
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')

    // ✅ 로그아웃 알림
    window.dispatchEvent(new Event('auth-change'))

    setUser(null)
    router.push('/login')
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        {/* 로고 */}
        <Link href="/" className="site-logo">
          <span className="site-logo-pill" />
          <span>보안형 독서 리뷰</span>
        </Link>

        {/* 네비게이션 */}
        <nav className="site-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                'site-nav-link' +
                (isActive(item.href) ? ' site-nav-link-active' : '')
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 로그인 / 사용자 영역 */}
        <div className="site-header-auth">
          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/mypage" className="site-user-name">
                {user.name}님
              </Link>
              <button
                onClick={handleLogout}
                className="site-logout-button"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link href="/login" className="site-login-button">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
