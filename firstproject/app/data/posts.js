/* </app/data/post.js> */
let posts = [
  { id: 1, title: "첫 번째 글", content: "이것은 첫 번째 게시글입니다." },
  { id: 2, title: "두 번째 글", content: "이것은 두 번째 게시글입니다." },
  { id: 3, title: "세 번째 글", content: "이것은 세 번째 게시글입니다." }
];

export function getPosts() {
  return posts;
}

export function getPost(id) {
  //id가 일치하는 post 가져오기
  const post = posts.find(p => p.id === Number(id));
  if (!post) {
    return { error: "Post not found" };
  }
  return post;
}

export function addPost(title, content) {
  const newPost = {
    id: posts.length + 1,
    title,
    content
  };
  posts.push(newPost);
  return newPost;
}

export function updatePost(id, title, content) {
  const idx = posts.findIndex(p => p.id === Number(id));
  if (idx === -1) return null;
  posts[idx] = { id: Number(id), title, content };
  return posts[idx];
}

export function deletePost(id) {
  const idx = posts.findIndex(p => p.id === Number(id));
  if (idx === -1) return false;
  posts.splice(idx, 1);
  return true;
}