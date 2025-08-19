//app/api/posts/route.js
import { getPosts, addPost } from '@/data/posts';

export async function GET() {
  const posts = getPosts();
  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(request) {
  const { title, content } = await request.json();
  const newPost = addPost(title, content);
  return new Response(JSON.stringify(newPost), {
    headers: { 'Content-Type': 'application/json' },
    status: 201
  });
}