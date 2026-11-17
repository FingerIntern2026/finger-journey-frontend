import { useRef, useState } from "react";
import CustomAuthForm from "../../../../common/custom/CustomAuthForm";
import PreboardingHero from "./PreboardingHero";
import styles from "./PreboardingLogin.module.css";

// 8자리(YYYYMMDD)가 실제로 있는 날짜인지 확인한다. (예: 19901301, 20000230은 거절)
function isValidBirthDate(value) {
  if (!/^\d{8}$/.test(value)) return false;
  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(4, 6));
  const day = Number(value.slice(6, 8));
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export default function PreboardingLogin({ onSubmit }) {
  const [serverError, setServerError] = useState("");

  const submitting = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (employeeNo, birthDate) => {
    if (submitting.current) return;
    if (!isValidBirthDate(birthDate)) {
      setServerError("생년월일이 올바르지 않아요");
      return;
    }
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
            field2Label="생년월일 8자리를 입력해주세요"
            field1Length={8}
            field2Length={8}
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
