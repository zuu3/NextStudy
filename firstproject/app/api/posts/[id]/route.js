//app/api/posts/[id]/route.js
import { getPost, updatePost, deletePost } from '@/data/posts';

export async function GET(request, { params }) {
  const post = getPost(params.id);
  if (!post) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }
  return new Response(JSON.stringify(post), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PUT(request, { params }) {
  const { title, content } = await request.json();
  const updated = updatePost(params.id, title, content);
  if (!updated) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }
  return new Response(JSON.stringify(updated), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
  //작성
}

export async function DELETE(request, { params }) {
  const deleted = deletePost(params.id);
  if (!deleted) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }
  return new Response(JSON.stringify({ message: "Deleted successfully" }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
}