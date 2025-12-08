'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { books } from '@/lib/data/books'
import { reviews } from '@/lib/data/reviews'
import { getTopBooks } from '@/lib/data/rating'

export default function HomePage() {
  const router = useRouter()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  // ✅ 임시 로그인 상태 (나중에 실제 인증 로직으로 교체)
  const isLoggedIn = false
  // const { user } = useUser()
  // const isLoggedIn = !!user

  // 보호된 페이지 이동 처리
  const handleProtectedNavigation = (path: string) => {
    if (isLoggedIn) {
      router.push(path)
    } else {
      setShowLoginPrompt(true)
    }
  }

  // 인기 도서 TOP 3
  const topBooks = getTopBooks(books, reviews, 3)

  // 카테고리별 그룹화
  const categories = [...new Set(books.map((b) => b.category || '기타'))]

  const booksByCategory = categories.map((category) => ({
    category,
    items: books.filter((b) => (b.category || '기타') === category),
  }))

  // 최신 도서
  const newestBooks = [...books].slice(-4)

  return (
    <div className="space-y-16">
      {/* ───────────────── Hero Section ───────────────── */}
      <section className="text-center py-16 bg-gradient-to-b from-blue-50 to-white rounded-3xl shadow-sm">
        <h1 className="text-4xl font-bold mb-4">
          📚 당신만의 안전한 독서 공간
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          리뷰, 토론, 추천까지 —  
          독서가 머무를 수 있는 조용한 자리.
        </p>

        <button
          onClick={() => handleProtectedNavigation('/books')}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          도서 둘러보기 →
        </button>
      </section>

      {/* ───────────────── 인기 도서 ───────────────── */}
      <section>
        <h2 className="text-2xl font-bold mb-4">⭐ 인기 도서 TOP 3</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topBooks.map((book) => (
            <div
              key={book.id}
              onClick={() =>
                handleProtectedNavigation(`/books/${book.id}`)
              }
              className="cursor-pointer p-5 rounded-2xl shadow hover:shadow-lg transition bg-white"
            >
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <p className="text-gray-500 text-sm mb-3">
                {book.author}
              </p>

              <div className="flex items-center gap-2 text-sm mt-auto">
                <span className="text-yellow-500 font-bold">
                  ★ {book.avgRating}
                </span>
                <span className="text-gray-500">
                  ({book.reviewCount} 리뷰)
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────── 카테고리별 도서 ───────────────── */}
      <section className="space-y-12">
        <h2 className="text-2xl font-bold">📚 카테고리별 도서</h2>

        {booksByCategory.map(({ category, items }) => (
          <div key={category}>
            <h3 className="text-xl font-semibold mb-4">{category}</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {items.map((book) => (
                <div
                  key={book.id}
                  onClick={() =>
                    handleProtectedNavigation(`/books/${book.id}`)
                  }
                  className="cursor-pointer p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
                >
                  <h4 className="font-medium">{book.title}</h4>
                  <p className="text-gray-500 text-sm">
                    {book.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ───────────────── 신규 도서 ───────────────── */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🆕 신규 등록 도서</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {newestBooks.map((book) => (
            <div
              key={book.id}
              onClick={() =>
                handleProtectedNavigation(`/books/${book.id}`)
              }
              className="cursor-pointer p-4 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <h4 className="font-medium">{book.title}</h4>
              <p className="text-gray-500 text-sm">
                {book.author}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────── 로그인 유도 팝업 ───────────────── */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center space-y-4 shadow-xl">
            <h3 className="text-lg font-semibold">
              로그인 후 이용할 수 있어요
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              이 공간은  
              로그인한 사용자에게만 열려 있어요.
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
    </div>
  )
}
