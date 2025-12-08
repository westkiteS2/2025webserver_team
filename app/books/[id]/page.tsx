// app/books/[id]/page.tsx

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { books } from '@/lib/data/books'
import { reviews } from '@/lib/data/reviews'
import { getBookRatingStats } from '@/lib/data/rating'
import ReviewForm from './review-form'

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const book = books.find((b) => b.id === id)
  if (!book) notFound()

  const bookReviews = reviews.filter((r) => r.bookId === id)
  const { avgRating, reviewCount } = getBookRatingStats(id, reviews)

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
      {/* ───────── Header ───────── */}
      <header className="flex justify-between items-start">
        <div className="space-y-4">
          {/* Breadcrumb */}
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <Link
              href="/books"
              className="hover:text-gray-700 transition font-medium"
            >
              도서 목록
            </Link>
            <span>/</span>
            <span className="text-gray-500">{book.title}</span>
          </p>

          {/* Title */}
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
            {book.title}
          </h1>

          {/* Author */}
          <p className="text-lg text-gray-500 font-medium">
            {book.author}
            {book.category && (
              <span className="text-gray-400"> · {book.category}</span>
            )}
          </p>
        </div>

        {/* Back button */}
        <Link
          href="/books"
          className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-sm shadow-sm"
        >
          ← 목록으로
        </Link>
      </header>

      {/* ───────── Main Layout ───────── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT: Description */}
        <div className="lg:col-span-2 space-y-10">
          {/* Book Description */}
          <div className="rounded-3xl p-10 bg-white/80 dark:bg-gray-800/40 backdrop-blur-md shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">책 소개</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {book.description}
            </p>
          </div>
        </div>

        {/* RIGHT: Rating Summary */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-3xl p-10 bg-white/90 dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">리뷰 요약</h2>

            <div className="flex items-end gap-4 mb-6">
              <span className="text-6xl font-bold">
                {reviewCount ? avgRating.toFixed(1) : '-'}
              </span>
              <span className="text-gray-400 text-xl pb-2">/ 5</span>
            </div>

            <p className="text-gray-500 mb-6">
              {reviewCount
                ? `총 ${reviewCount}개의 리뷰`
                : '리뷰가 아직 없습니다.'}
            </p>

            {/* Badges */}
            <div className="flex gap-3">
              <span className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-sm shadow-sm">
                ★ {reviewCount ? avgRating.toFixed(1) : '-'}
              </span>
              <span className="px-4 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300">
                리뷰 {reviewCount}개
              </span>
            </div>
          </div>
        </aside>
      </section>

      {/* ───────── Reviews List ───────── */}
      <section className="space-y-10">
        <div>
          <h2 className="text-3xl font-semibold">리뷰</h2>
          <p className="text-gray-500 mt-1">
            독자들의 생생한 의견을 확인하세요.
          </p>
        </div>

        {bookReviews.length === 0 ? (
          <p className="text-gray-400 text-lg">
            아직 리뷰가 없습니다. 첫 리뷰를 남겨보세요!
          </p>
        ) : (
          <ul className="space-y-8">
            {bookReviews.map((review) => (
              <li
                key={review.id}
                className="rounded-3xl p-8 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xl font-bold text-gray-600 dark:text-gray-300">
                      {review.nickname[0]}
                    </div>
                    <span className="font-semibold text-lg">
                      {review.nickname}
                    </span>
                  </div>

                  <span className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-sm">
                    ★ {review.rating}
                  </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {review.content}
                </p>

                {review.createdAt && (
                  <p className="text-sm text-gray-400 mt-5">
                    {review.createdAt}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ───────── Review Form ───────── */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold">리뷰 작성</h2>
        <p className="text-gray-500">솔직하고 자유롭게 후기를 남겨주세요.</p>

        <div className="rounded-3xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 p-10">
          <ReviewForm />
        </div>
      </section>
    </div>
  )
}
