/* app/list/page.js */
import { connectDB } from "@/util/database"
import ListItem from "./ListItem"
import Link from "next/link"

export default async function List() {
  let client = await connectDB
  const db = client.db('board')
  let result = await db.collection('post').find().toArray()

  return (
    <div className="list-bg">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>게시글 목록</h1>
        <Link href="/write">
          <button
            style={{
              padding: '0.7rem 1.5rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            글쓰기
          </button>
        </Link>
      </div>
      {result.map((item, i) => (
        <ListItem key={i} item={item} />
      ))}
    </div>
  )
}