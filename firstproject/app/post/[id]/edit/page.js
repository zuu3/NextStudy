"use client";

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EditPost() {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    async function fetchPost() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) throw new Error('Not found');
        const data = await response.json();
        setPost({ title: data.title || '', content: data.content || '' });
      } catch (err) {
        console.error(err);
        setError('글을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to update the post');
      }

      router.push(`/post/${id}`);
    } catch (err) {
      console.error(err);
      setError('수정에 실패했습니다.');
    }
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>포스트 수정</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="title">Title:</label><br />
          <input
            id="title"
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            style={{ width: '100%', padding: '0.5rem' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="content">Content:</label><br />
          <textarea
            id="content"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            rows="10"
            style={{ width: '100%', padding: '0.5rem' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>포스트 수정.</button>
      </form>
    </div>
  );
}