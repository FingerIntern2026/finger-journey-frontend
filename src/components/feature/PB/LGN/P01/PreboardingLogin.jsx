import { useState } from "react";
import CustomAuthForm from "../../../../common/custom/CustomAuthForm";
import PreboardingHero from "./PreboardingHero";
import styles from "./PreboardingLogin.module.css";

export default function PreboardingLogin({ onSubmit }) {
  const [serverError, setServerError] = useState("");

  const handleSubmit = (employeeNo, birthDate) => {
    setServerError("");

    try {
      const isMoved = onSubmit({ employeeNo, birthDate });

      if (!isMoved) {
        setServerError("다음 화면 정보를 찾을 수 없습니다.");
      }
    } catch {
      setServerError("화면 정보를 불러온 뒤 다시 시도해주세요.");
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.content}>
        <PreboardingHero
          name="???"
          description={
            <>
              반가워요! 하단 입력창에
              <br />
              본인의 사원번호를 입력해주세요.
            </>
          }
        />

        <div className={styles.formArea}>
          <CustomAuthForm
            field1Label="사원번호 8자리를 입력해주세요"
            field2Label="생년월일 6자리를 입력해주세요"
            field1Length={8}
            field2Length={6}
            emptyMessage="값을 입력해주세요"
            field1ErrorMessage="사원번호가 올바르지 않아요"
            field2ErrorMessage="생년월일이 올바르지 않아요"
            skipValidation
            buttonLabel="입력했어요"
            serverError={serverError}
            onSubmit={handleSubmit}
            className={styles.authForm}
            inputClassName={styles.authInput}
            buttonClassName={styles.authButton}
          />
        </div>
      </div>
    </section>
  );
}
