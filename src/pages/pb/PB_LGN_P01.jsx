import { useState } from "react";
import CustomAuthForm from "../../components/common/custom/CustomAuthForm";
import PreboardingHero from "../../components/feature/PB/LGN/P01/PreboardingHero.jsx";
import useNavigationStore from "../../stores/useNavigationStore";
import styles from "./PB_LGN_P01.module.css";

/**
 * 프리보딩 첫 화면
 *
 * 인증 API가 연결되기 전까지는 CustomAuthForm의 빈 값·숫자 형식 검증 후
 * 입력값을 다음 화면의 params로 전달한다.
 */
export default function PB_LGN_P01({ preview = false }) {
  const goForward = useNavigationStore((state) => state.goForward);
  const [serverError, setServerError] = useState("");

  const handleSubmit = (employeeNo, birthDate) => {
    setServerError("");

    try {
      const isMoved = goForward("PB_LGN_P02", {
        employeeNo,
        birthDate,
      });

      if (!isMoved) {
        setServerError("다음 화면 정보를 찾을 수 없습니다.");
      }
    } catch {
      setServerError("화면 정보를 불러온 뒤 다시 시도해주세요.");
    }
  };

  return (
    <section className={`${styles.page} ${preview ? styles.previewPage : ""}`}>
      <div className={styles.content}>
        <PreboardingHero
          name="???"
          description={
            <>
              반가워요! 하단 입력창에<br />
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
