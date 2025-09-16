/* app/write/page.js */
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Write() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1>로그인 필요</h1>
        <p>글쓰기는 로그인한 사용자만 가능합니다.</p>
        <Link href="/api/auth/signin">로그인 하러가기</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>글 작성</h1>
      <form action="/api/post/new" method="POST">
        <div style={{ marginBottom: '1rem' }}>
          <label>글제목:</label><br />
          <input
            name="title"
            placeholder="글제목"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>글내용:</label><br />
          <textarea
            name="content"
            placeholder="글내용"
            rows="10"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '0.7rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          전송
        </button>
      </form>
    </div>
  )
}
