/* app/api/post/[id]/route.js */
import { connectDB } from "@/util/database.js";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json("게시글 ID가 없습니다!", { status: 400 });
    }

    const client = await connectDB;
    const db = client.db("board");

    const deleteResult = await db.collection("post").deleteOne({
      _id: new ObjectId(id)
    });

    if (deleteResult.deletedCount === 1) {
      return NextResponse.json({
        message: `게시글 ${id} 삭제 성공`,
        deletedId: id
      }, { status: 200 });
    } else {
      return NextResponse.json("삭제할 게시글을 찾을 수 없습니다.", { status: 404 });
    }
  } catch (error) {
    console.error('다이나믹 라우터 삭제 오류:', error);
    return NextResponse.json("서버 오류가 발생했습니다.", { status: 500 });
  }
}
