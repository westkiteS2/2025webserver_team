// app/community/write-button.tsx

'use client'

export default function WriteButton() {
  return (
    <button
      type="button"
      className="
        px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
        hover:bg-gray-100 dark:hover:bg-gray-700 transition
        text-sm font-medium
      "
      onClick={() =>
        alert('글쓰기 페이지는 /community/new 라우트로 추가될 예정입니다.')
      }
    >
      + 게시글 작성
    </button>
  )
}
