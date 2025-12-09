// lib/data/books.ts

export type Book = {
  id: string
  title: string
  author: string
  description: string
  category?: string
  coverImage?: string
}

export const books: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A tragic love story set in the Jazz Age.',
    category: '문학',
    coverImage: '/images/gatsby.jpg',
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'Build good habits and break the bad ones.',
    category: '자기계발',
    coverImage: '/images/atomic-habits.jpg',
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel about surveillance society.',
    category: '소설',
    coverImage: '/images/1984.jpg',
  },
]