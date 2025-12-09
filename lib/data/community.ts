// lib/data/community.ts

export type CommunityPost = {
  id: string
  title: string
  content: string
  excerpt: string
  category: string
  nickname: string
  hasPoll?: boolean
  createdAt: string
  likes: number
}

export type CommentItem = {
  id: string
  postId: string
  nickname: string
  content: string
  createdAt: string
}

export type Poll = {
  id: string
  postId: string
  question: string
}

export type PollOption = {
  id: string
  pollId: string
  text: string
  votes: number
}

export const communityPosts: CommunityPost[] = [
  {
    id: 'c1',
    title: '2024년에 읽은 최고의 책은?',
    content: '2024년에 읽은 책 중에서 가장 좋았던 책을 공유해보세요.',
    excerpt: '2024년에 읽은 책 중 가장 기억에 남는 책이 무엇인가요?',
    category: '토론',
    nickname: 'ReadingFox',
    hasPoll: true,
    createdAt: '2024-01-01',
    likes: 12,
  },
  {
    id: 'c2',
    title: 'SF 추천 좀 해주세요',
    content: '듄 같은 하드 SF 좋아하는데 비슷한 작품 없을까요?',
    excerpt: '듄 같은 느낌의 SF 작품 찾는 중!',
    category: '추천',
    nickname: 'SpaceWalker',
    hasPoll: false,
    createdAt: '2024-02-14',
    likes: 30,
  },
  {
    id: 'c3',
    title: '최근에 읽은 책 후기!',
    content: '최근에 읽은 책에 대한 짧은 소감 공유해요!',
    excerpt: '최근 읽은 책들 간단 후기 나눠요.',
    category: '후기',
    nickname: 'BookLover',
    hasPoll: false,
    createdAt: '2024-03-10',
    likes: 8,
  },
]

export const comments: CommentItem[] = [
  {
    id: 'cm1',
    postId: 'c1',
    nickname: 'NovelFan',
    content: "저는 '프로젝트 헤일메리'가 최고였어요!",
    createdAt: '2024-01-05',
  },
  {
    id: 'cm2',
    postId: 'c1',
    nickname: 'Reader22',
    content: '저도 그 책 정말 재밌게 읽었어요.',
    createdAt: '2024-01-06',
  },
  {
    id: 'cm3',
    postId: 'c2',
    nickname: 'SciFiMan',
    content: '하이페리온 추천드립니다!',
    createdAt: '2024-02-20',
  },
]

export const polls: Poll[] = [
  {
    id: 'p1',
    postId: 'c1',
    question: '2024년에 가장 인상 깊었던 책은 무엇인가요?',
  },
]

export const pollOptions: PollOption[] = [
  { id: 'po1', pollId: 'p1', text: '프로젝트 헤일메리', votes: 12 },
  { id: 'po2', pollId: 'p1', text: '아몬드', votes: 5 },
  { id: 'po3', pollId: 'p1', text: '세이노의 가르침', votes: 3 },
]
