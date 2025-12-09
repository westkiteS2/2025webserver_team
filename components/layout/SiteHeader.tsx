'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react' // useEffect 추가
import { Menu, Search, User, LogOut } from 'lucide-react'

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // 로그인 상태
  const router = useRouter()

  // 컴포넌트 로드 시 local Storate에서 상태 읽어오기
  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  const handleProtectedAction = (path?: string) => {
    if (isLoggedIn) {
      if (path) router.push(path)
    } else {
      setShowLoginPrompt(true)
    }
  }

  /** Mock 함수 제거
  const handleLogin = () => {
    setIsLoggedIn(true)
    setShowLoginPrompt(false)
  }
    */

  // 로그아웃 시 local Storage 상태 제거
  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('loggedIn') // ✅ 추가: 저장된 로그인 상태 삭제
    router.push('/')
  }

  return (
    <>
      <header className="border-b bg-white sticky top-0 z-30">
        <div className="app-container mx-auto flex h-16 items-center justify-between px-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden text-gray-800"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="text-xl font-bold text-gray-900">
              📚 Secure Book Review
            </Link>
          </div>

          {/* Center: Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-gray-700">
            <button
              onClick={() => handleProtectedAction('/books')}
              className="hover:text-blue-600"
            >
              도서 목록
            </button>

            <button
              onClick={() => handleProtectedAction('/community')}
              className="hover:text-blue-600"
            >
              커뮤니티
            </button>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* 검색창 */}
            <div
              onClick={() => handleProtectedAction()}
              className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-xl cursor-pointer"
            >
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search books..."
                readOnly
                className="bg-transparent px-2 text-sm cursor-pointer focus:outline-none"
              />
            </div>

            {/* 로그인 / 프로필 / 로그아웃 버튼 */}
            {!isLoggedIn ? (
              <button
                onClick={() => router.push('/login')}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <User className="w-4 h-4" />
                로그인
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300">
                  <User className="w-4 h-4" />
                  유저
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t bg-white px-4 py-3 space-y-3">
            <button
              onClick={() => handleProtectedAction('/books')}
              className="block w-full text-left text-gray-700"
            >
              도서 목록
            </button>

            <button
              onClick={() => handleProtectedAction('/community')}
              className="block w-full text-left text-gray-700"
            >
              커뮤니티
            </button>

            <div
              onClick={() => handleProtectedAction()}
              className="flex items-center bg-gray-100 px-3 py-2 rounded-xl cursor-pointer"
            >
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                readOnly
                className="bg-transparent px-2 text-sm cursor-pointer focus:outline-none"
              />
            </div>
          </div>
        )}
      </header>

      {/* 로그인 유도 팝업 */}
      {showLoginPrompt && !isLoggedIn && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center space-y-4 shadow-xl">
            <h3 className="text-lg font-semibold">
              로그인 후 이용할 수 있어요
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              이 공간은 로그인한 사용자에게만 열려 있어요.
            </p>

            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="px-4 py-2 rounded-lg border"
              >
                닫기
              </button>

              <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                로그인하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
