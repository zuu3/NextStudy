/* app/api/post/new/route.js */
import { connectDB } from "@/util/database.js";
import { NextResponse } from "next/server";

// App Router 방식에 맞게 POST 메서드로 작성
export async function POST(request) {
  try {
    // formData를 비동기로 파싱 (POST 요청의 form 데이터 받기)
    const formData = await request.formData();
    // formData의 entries를 객체로 변환 (key-value 쌍으로 변환)
    const body = Object.fromEntries(formData.entries());

    // 기본 검증
    if (!body.title || body.title.trim() === "") {
      return NextResponse.json("제목을 입력해주세요!", { status: 500 });
    }

    if (!body.content || body.content.trim() === "") {
      return NextResponse.json("내용을 입력해주세요!", { status: 500 });
    }

    // body로 전송된 데이터를 DB에 저장
    const client = await connectDB;
    const db = client.db("board");
    await db.collection("post").insertOne({
      title: body.title,
      content: body.content,
      createdAt: new Date()
    });

    // App Router에서는 redirect를 NextResponse.redirect로 처리
    return NextResponse.redirect(new URL("/list", request.url), 302);
  } catch (error) {
    console.error(error);
    return NextResponse.json("서버 오류", { status: 500 });
  }
}
