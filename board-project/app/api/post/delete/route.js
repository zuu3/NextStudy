/* app/api/post/delete/route.js */
import { connectDB } from "@/util/database.js";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";

export async function POST(request) {
  try {
    // 1. 세션 정보 가져오기 (await 추가)
    let session = await getServerSession(authOptions);

    // 2. 로그인 여부 확인
    if (!session) {
      return NextResponse.json("로그인이 필요합니다.", { status: 401 });
    }

    const body = await request.text();

    if (!body) {
      return NextResponse.json("게시글 ID가 없습니다!", { status: 400 });
    }

    const client = await connectDB;
    const db = client.db("board");

    // 3. 로그인한 유저의 email과 DB의 email(author)이 일치하는지 확인
    // 먼저 해당 게시글을 조회하여 작성자 확인
    const post = await db.collection("post").findOne({ _id: new ObjectId(body) });

    if (!post) {
      return NextResponse.json("삭제할 게시글을 찾을 수 없습니다.", { status: 404 });
    }

    // 관리자면 모든 글 삭제 가능, 일반은 본인 글만
    const isAdmin = session.user?.role === 'admin';
    const isOwner = post.author === session.user.email;
    if (!isAdmin && !isOwner) {
      return NextResponse.json("본인이 작성한 글만 삭제할 수 있습니다.", { status: 403 });
    }

    // 권한 확인 완료 후 삭제 실행
    const delres = await db.collection("post").deleteOne({ _id: new ObjectId(body) });

    if (delres.deletedCount === 1) {
      return NextResponse.json(body + " 삭제성공", { status: 200 });
    } else {
      return NextResponse.json("삭제에 실패했습니다.", { status: 404 });
    }
  } catch (error) {
    console.error('삭제 오류:', error);
    return NextResponse.json("서버 오류", { status: 500 });
  }
}
