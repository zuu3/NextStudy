import styles from "./register.module.css";

export default function Register() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>회원가입</h2>
        <form method="POST" action="/api/auth/signup" noValidate>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>이름</label>
            <input id="name" name="name" type="text" placeholder="홍길동" className={styles.input} required />
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>이메일</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" className={styles.input} required />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>비밀번호</label>
            <input id="password" name="password" type="password" placeholder="8자 이상" className={styles.input} required minLength={8} />
          </div>

          <button type="submit" className={styles.submit}>가입하기</button>
        </form>
      </div>
    </div>
  );
}