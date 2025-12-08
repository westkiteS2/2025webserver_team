// app/books/page.tsx

import Link from 'next/link'
import { books } from '@/lib/data/books'
import { reviews } from '@/lib/data/reviews'
import { getBookRatingStats } from '@/lib/data/rating'

export default function BooksPage() {
  const enrichedBooks = books.map((book) => {
    const stats = getBookRatingStats(book.id, reviews)
    return {
      ...book,
      avgRating: stats.avgRating,
      reviewCount: stats.reviewCount,
    }
  })

  const sortedBooks = enrichedBooks.sort((a, b) => {
    if (b.avgRating === a.avgRating) {
      return b.reviewCount - a.reviewCount
    }
    return b.avgRating - a.avgRating
  })

  const categories = ['전체', ...new Set(books.map((b) => b.category))]

  return (
    <div className="space-y-12">
      {/* ───────── 페이지 헤더 ───────── */}
      <header className="text-center space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">도서 목록</h1>
        <p className="text-gray-600 dark:text-gray-400">
          등록된 책을 확인하고 원하는 책을 선택해 리뷰를 남겨보세요.
        </p>
      </header>

      {/* ───────── 카테고리 필터 ───────── */}
      <div className="flex justify-center gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className="
              px-4 py-2 rounded-full text-sm font-medium
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-800
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition
            "
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ───────── 도서 카드 리스트 ───────── */}
      <div
        className="
          grid gap-8
          sm:grid-cols-2 
          lg:grid-cols-3
        "
      >
        {sortedBooks.length === 0 ? (
          <p className="text-center text-gray-500">
            아직 등록된 도서가 없습니다.
          </p>
        ) : (
          sortedBooks.map((book) => (
            <article
              key={book.id}
              className="
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                rounded-2xl overflow-hidden
                shadow-sm hover:shadow-lg
                transition
                flex flex-col justify-between
              "
            >
              {/* 카드 내용 */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500">저자 {book.author}</p>

                {book.description && (
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                    {book.description}
                  </p>
                )}

                <div className="flex gap-2 flex-wrap pt-2">
                  <span
                    className="
                      bg-yellow-100 text-yellow-700
                      dark:bg-yellow-700 dark:text-yellow-200
                      text-xs px-3 py-1 rounded-full font-semibold
                    "
                  >
                    ★ {book.avgRating.toFixed(1)}
                  </span>

                  <span
                    className="
                      bg-blue-50 text-blue-600
                      dark:bg-blue-800 dark:text-blue-200
                      text-xs px-3 py-1 rounded-full
                    "
                  >
                    리뷰 {book.reviewCount}개
                  </span>

                  {book.category && (
                    <span
                      className="
                        border border-gray-300 dark:border-gray-600
                        text-xs px-3 py-1 rounded-full
                      "
                    >
                      {book.category}
                    </span>
                  )}
                </div>
              </div>

              {/* 카드 Footer */}
              <div className="p-6 border-t border-gray-100 dark:border-gray-700">
                <Link
                  href={`/books/${book.id}`}
                  className="
                    w-full block text-center
                    py-2 rounded-lg
                    border border-gray-300 dark:border-gray-600
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    transition
                    text-sm font-medium
                  "
                >
                  상세 보기
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
