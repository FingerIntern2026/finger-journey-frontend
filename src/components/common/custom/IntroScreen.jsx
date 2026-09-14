// IntroScreen.jsx
// "안내 문구 + 일러스트 + 진입 버튼 1개" 구조를 재사용하는 컴포넌트예요.
// 가방싸기 설명(CHK_EXP_P01), 위키 인트로(WIK_INT_P01), 체크인 마지막 화면(CHK_FIN_P01)
// 3개 화면에서 재사용해요.
// 상단 뱃지는 화면마다 다르지 않고 "핑거저니"로 통일해서 고정했어요.

import styles from './custom.module.css';

const IntroScreen = ({
  title,            // 필수. 큰 제목
  description,      // 선택. 제목 아래 작은 설명 문구. 없으면 안 그림
  buttonLabel,      // 필수. 버튼 글자
  onButtonClick,    // 필수. 버튼 눌렀을 때 실행할 함수 (다음 화면 이동은 부모가 처리)
}) => {
  return (
    <div>
      {/* 뱃지는 고정 문구라서 props로 안 받고 여기 그냥 박아둠 */}
      <span className={styles.introBadge}>핑거저니</span>

      <h1 className={styles.introTitle}>{title}</h1>

      {/* 설명 문구는 있을 때만 그림 */}
      {description && <p className={styles.introDescription}>{description}</p>}

      {/* 임시 자리표시자: 실제 일러스트 나오기 전까지 회색 박스로 대신 채워둠
          나중에 이미지 받으면 이 div를 <img src={...} /> 로 바꾸면 됨 */}
      <div className={styles.introPlaceholder} />

      <button className={styles.introButton} onClick={onButtonClick}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default IntroScreen;