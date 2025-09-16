// app/api/auth/signup/route.js)
import { connectDB } from "@/util/database";
import bcrypt from "bcrypt"; // 네이티브 bcrypt 사용

// POST 요청 처리
export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const password = (formData.get("password") || "").toString();

    // 과제1: 빈칸인 경우
    if (!name || !email || !password) {
      return new Response(JSON.stringify("로그인하세요"), { status: 400 });
    }

    const client = await connectDB;
    const db = client.db('board');

    // 과제2: 이메일 중복 체크
    const exists = await db.collection('user_cred').findOne({ email });
    if (exists) {
      return new Response(JSON.stringify("이미 가입된 이메일입니다."), { status: 409 });
    }

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // 기본 role 부여
    const doc = { name, email, password: hash, role: 'user', createdAt: new Date() };
    await db.collection('user_cred').insertOne(doc);

    return new Response(JSON.stringify("회원가입 성공"), { status: 200 });
  } catch (e) {
    console.error('signup error', e);
    return new Response(JSON.stringify("회원가입 실패"), { status: 500 });
  }

  // body에는 클라이언트에서 보낸 회원가입 정보가 담겨있습니다.
  // 예: { username: "user1", password: "pass123" }

  //과제0. try-catch문으로 에러발생시 '회원가입 실패' json값으로 리턴
  //과제1. 아틀라스 DB에 user_cred 컬렉션에 회원 정보 확인하기
  //과제2. user id 빈칸인 경우체크하고 이메일 중복시 확인하기
}