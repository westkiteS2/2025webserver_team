// lib/data/rating.ts

import { Book } from './books'
import { reviews as allReviews } from './reviews'

export type RankedBook = Book & {
  avgRating: number
  reviewCount: number
}

export function getTopBooks(
  books: Book[],
  reviews = allReviews,
  limit = 3
): RankedBook[] {
  const ranked = books.map((book) => {
    const bookReviews = reviews.filter((r) => r.bookId === book.id)

    const avgRating =
      bookReviews.length === 0
        ? 0
        : bookReviews.reduce((s, r) => s + r.rating, 0) / bookReviews.length

    return {
      ...book,
      avgRating: parseFloat(avgRating.toFixed(1)),
      reviewCount: bookReviews.length,
    }
  })

  return ranked
    .sort((a, b) => {
      // 평점 우선 + 리뷰수 보조 정렬
      if (b.avgRating === a.avgRating) {
        return b.reviewCount - a.reviewCount
      }
      return b.avgRating - a.avgRating
    })
    .slice(0, limit)
}

// 책 하나의 평균 평점 + 리뷰 수 계산
export function getBookRatingStats(bookId: string, reviews = allReviews) {
  const bookReviews = reviews.filter((r) => r.bookId === bookId)

  if (bookReviews.length === 0) {
    return {
      avgRating: 0,
      reviewCount: 0,
    }
  }

  const total = bookReviews.reduce((s, r) => s + r.rating, 0)
  const avg = total / bookReviews.length

  return {
    avgRating: parseFloat(avg.toFixed(1)),
    reviewCount: bookReviews.length,
  }
}
