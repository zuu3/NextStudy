/* app/api/post/delete/route.js */
import { connectDB } from "@/util/database.js";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {
    const body = await request.text();

    if (!body) {
      return NextResponse.json("게시글 ID가 없습니다!", { status: 400 });
    }

    const client = await connectDB;
    const db = client.db("board");

    const delres = await db.collection("post").deleteOne({ _id: new ObjectId(body) });

    if (delres.deletedCount === 1) {
      return NextResponse.json(body + " 삭제성공", { status: 200 });
    } else {
      return NextResponse.json("삭제할 게시글을 찾을 수 없습니다.", { status: 404 });
    }
  } catch (error) {
    console.error('삭제 오류:', error);
    return NextResponse.json("서버 오류", { status: 500 });
  }
}
