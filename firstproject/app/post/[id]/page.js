//app/post/[id]/page.js
'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      //id가 일치하는 포스트 가져와서 post변경하기
      fetch(`/api/posts/${id}`)
        .then(res => res.json())
        .then(data => {
          setPost(data);
          setLoading(false);
        })
        .catch(() => {
          setPost({ error: "글을 찾을 수 없습니다." });
          setLoading(false);
        });
      clearTimeout(timer);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) return <div>로딩중...</div>;
  if (post && post.error) return <div>글을 찾을 수 없습니다.</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <h4>{post.content}</h4>
      <br />
      <span className="button"><Link href="/list">목록으로</Link></span>
      <span className="button"><Link href={`/post/${id}/edit`}>수정</Link></span>
    </div>
  );
}