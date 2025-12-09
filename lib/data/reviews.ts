// lib/data/reviews.ts

export type Review = {
  id: string
  bookId: string
  nickname: string
  rating: number
  content: string
  createdAt: string
}

export const reviews: Review[] = [
  {
    id: 'r1',
    bookId: '1',
    nickname: '민수',
    rating: 5,
    content: 'Beautiful and poetic.',
    createdAt: '2024-01-10',
  },
  {
    id: 'r2',
    bookId: '2',
    nickname: '아라',
    rating: 4,
    content: 'Very practical and life-changing.',
    createdAt: '2024-02-05',
  },
  {
    id: 'r3',
    bookId: '1',
    nickname: '지훈',
    rating: 3,
    content: 'A bit slow but still good.',
    createdAt: '2024-03-12',
  },
]
