import { useRef, useState } from "react";
import CustomAuthForm from "../../../../common/custom/CustomAuthForm";
import PreboardingHero from "./PreboardingHero";
import styles from "./PreboardingLogin.module.css";

export default function PreboardingLogin({ onSubmit }) {
  const [serverError, setServerError] = useState("");

  const submitting = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (employeeNo, birthDate) => {
    if (submitting.current) return;
    submitting.current = true;
    setIsSubmitting(true);
    setServerError("");

    try {
      await onSubmit({ employeeNo, birthDate });
    } catch (error) {
      setServerError(error.response?.data?.message || error.message || '로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      submitting.current = false;
      setIsSubmitting(false);
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
            disabled={isSubmitting}
            buttonLabel={isSubmitting ? '확인 중...' : '입력했어요'}
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
