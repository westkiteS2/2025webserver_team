// src/app/books/[id]/review-form.tsx

'use client'

export default function ReviewForm() {
  return (
    <form
      className="card card-surface review-form p-6 space-y-6"
      onSubmit={(e) => {
        e.preventDefault()
        alert('지금은 임시 저장 상태입니다.')
      }}
    >
      {/* 닉네임 & 별점 */}
      <div className="flex flex-col gap-4">
        <label className="form-label flex flex-col">
          닉네임
          <input
            name="nickname"
            type="text"
            placeholder="리뷰에 표시될 이름"
            className="input mt-1"
            required
          />
        </label>

        <label className="form-label flex flex-col">
          별점
          <select
            name="rating"
            className="input mt-1"
            defaultValue="5"
            required
          >
            <option value="5">★★★★★ (5점)</option>
            <option value="4">★★★★☆ (4점)</option>
            <option value="3">★★★☆☆ (3점)</option>
            <option value="2">★★☆☆☆ (2점)</option>
            <option value="1">★☆☆☆☆ (1점)</option>
          </select>
        </label>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4" />

      {/* 리뷰 내용 */}
      <label className="form-label flex flex-col">
        리뷰 내용
        <textarea
          name="content"
          rows={5}
          placeholder="이 책을 읽고 느낀 점을 자유롭게 적어주세요."
          className="textarea mt-2"
          required
        />
      </label>

      {/* 구분선 */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4" />

      {/* 리뷰 등록 버튼 */}
      <button
        type="submit"
        className="
          w-full py-3 rounded-md 
          bg-blue-600 text-white font-semibold
          hover:bg-blue-700 active:bg-blue-800
          transition-colors shadow
        "
      >
        리뷰 등록
      </button>
    </form>
  )
}