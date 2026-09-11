// AcrosticResultScreen.jsx
// 3행시 완료 화면이에요. 이름 글자 수에 따라 2줄/3줄/4줄로 달라질 수 있어서,
// 고정 3줄이 아니라 lines 배열 길이만큼 자동으로 줄이 그려지게 만들었어요.
// 뱃지+진행률바는 Header 영역이라 여긴 포함 안 시켜요.

import styles from './custom.module.css';

const AcrosticResultScreen = ({
  userBadgeText,     // 필수. 사용자 뱃지 카드 문구 (예: "김핑거 #오솔길완주 #3행시")
  lines,             // 필수. [{ letter: '김', text: '김밥처럼' }, ...] 형태의 배열. 길이가 곧 줄 수
  onButtonClick,      // 필수. "AI 완주 리포트 보기" 버튼 눌렀을 때 실행할 함수
}) => {
  return (
    <div className={styles.acrosticResultScreen}>
      {/* 컨페티 - 모든 경우 공통이라 고정 이미지 */}
      <img src="/images/confetti.svg" alt="" className={styles.confettiImage} />

      <p className={styles.acrosticCompleteText}>3행시가 저장됐어요!</p>

      {/* 사용자 뱃지 카드 */}
      <div className={styles.userBadgeCard}>
        <p>{userBadgeText}</p>
      </div>

      {/* lines 배열 길이만큼 자동으로 줄이 생김 - 2줄이든 4줄이든 코드 안 고쳐도 됨 */}
      <div className={styles.acrosticLines}>
        {lines.map((line, index) => (
          <div key={index} className={styles.acrosticLineRow}>
            <span className={styles.acrosticLetter}>{line.letter}</span>
            <span className={styles.acrosticText}>{line.text}</span>
          </div>
        ))}
      </div>

      <button className={styles.introButton} onClick={onButtonClick}>
        AI 완주 리포트 보기
      </button>
    </div>
  );
};

export default AcrosticResultScreen;