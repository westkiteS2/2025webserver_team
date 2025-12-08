// app/community/page.tsx
import Link from 'next/link'
import { communityPosts, comments } from '@/lib/data/community'
import WriteButton from './write-button' // 클라이언트 컴포넌트로 분리

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const currentCategory = category ?? '전체'

  const categorySet = new Set(communityPosts.map((p) => p.category))
  const categories = ['전체', ...Array.from(categorySet)]

  const postsWithStats = communityPosts.map((post) => {
    const commentCount = comments.filter((c) => c.postId === post.id).length
    return { ...post, commentCount }
  })

  const filteredPosts =
    currentCategory === '전체'
      ? postsWithStats
      : postsWithStats.filter((post) => post.category === currentCategory)

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.createdAt && b.createdAt && a.createdAt !== b.createdAt) {
      return b.createdAt.localeCompare(a.createdAt)
    }
    return (b.commentCount ?? 0) - (a.commentCount ?? 0)
  })

  return (
    <div className="space-y-12">
      <header className="text-center space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">커뮤니티</h1>
        <p className="text-gray-600 dark:text-gray-400">
          책에 대한 생각을 자유롭게 나누고 토론에 참여해 보세요.
        </p>
      </header>

      {/* 카테고리 탭 */}
      <nav className="flex justify-center gap-3 flex-wrap">
        {categories.map((cat) => {
          const isActive = currentCategory === cat
          const href =
            cat === '전체'
              ? '/community'
              : `/community?category=${encodeURIComponent(cat)}`

          return (
            <Link
              key={cat}
              href={href}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition
                ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              {cat}
            </Link>
          )
        })}
      </nav>

      <div className="flex justify-between items-center">
        <p className="text-gray-600 dark:text-gray-400">
          총 {sortedPosts.length}개의 게시글
        </p>

        {/* 👉 클라이언트 컴포넌트라 이벤트 처리 가능 */}
        <WriteButton />
      </div>

      <div className="space-y-6">
        {sortedPosts.length === 0 ? (
          <p className="text-gray-500 text-center">
            아직 게시글이 없습니다. 첫 글을 남겨보세요!
          </p>
        ) : (
          sortedPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition space-y-4"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600">
                  {post.category}
                </span>

                {post.hasPoll && (
                  <span className="px-3 py-1 rounded-full bg-blue-600 text-white">
                    투표글
                  </span>
                )}
              </div>

              <h2 className="text-xl font-semibold hover:text-blue-600 transition">
                <Link href={`/community/${post.id}`}>{post.title}</Link>
              </h2>

              {post.excerpt && (
                <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                  {post.excerpt}
                </p>
              )}

              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>작성자 {post.nickname}</span>
                <span>{post.createdAt}</span>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-sm">💬 댓글 {post.commentCount}개</span>
                <Link
                  href={`/community/${post.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  게시글 보기 →
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
