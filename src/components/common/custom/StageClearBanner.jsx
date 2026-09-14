// StageClearBanner.jsx
// ContentCarousel 8개 스테이지(핑거이야기, 취업규칙, 인사규정, 윤리규정,
// 이메일안내, 법인카드안내, 포레스트, 레벨업) 완료 화면 전용 컴포넌트예요.
// 컨페티 이미지는 8개 스테이지 전부 똑같아서 고정으로 넣어두고,
// 제목/부제목/아이콘/캡션/링크는 스테이지마다 달라서 props로 받아요.

import styles from './custom.module.css';

const StageClearBanner = ({
  stageIcon,          // 필수. 스테이지별 아이콘 이미지 경로
  stageTitle,         // 필수. 상단 제목 (예: "FOREST", "법인카드")
  stageSubtitle,      // 선택. 상단 부제목
  clearCaption,       // 선택. STAGE CLEAR! 아래 캡션 텍스트 (법인카드 케이스)
  linkLabel,          // 선택. STAGE CLEAR! 아래 링크 문구 (포레스트 케이스)
  onLinkClick,        // 선택. linkLabel 있을 때만 필요
  onButtonClick,      // 필수. 완료 버튼 눌렀을 때 실행할 함수
}) => {
  return (
    <div className={styles.stageClearBanner}>
      {/* 상단 - 스테이지별로 달라지는 부분 */}
      <div className={styles.stageHeader}>
        <img src={stageIcon} alt="" className={styles.stageIconImage} />
        <h2 className={styles.stageTitle}>{stageTitle}</h2>
        {stageSubtitle && <p className={styles.stageSubtitle}>{stageSubtitle}</p>}
      </div>

      {/* 중앙 - 컨페티+CLEAR!는 공통, 캡션/링크만 선택적으로 달라짐 */}
      <div className={styles.clearBox}>
        {/* 컨페티는 8개 스테이지 전부 같은 이미지라서 고정 경로로 박아둠 */}
        <img src="/images/confetti.svg" alt="" className={styles.confettiImage} />
        <p className={styles.clearText}>STAGE CLEAR!</p>

        {/* 캡션 텍스트 또는 링크 중 하나만 있을 수 있고, 둘 다 없을 수도 있음 */}
        {clearCaption && <p className={styles.clearCaption}>{clearCaption}</p>}
        {linkLabel && (
          <div className={styles.linkArea}>
            <span>더 알고 싶다면?</span>
            <a onClick={onLinkClick} className={styles.linkText}>{linkLabel}</a>
          </div>
        )}
      </div>

      <button className={styles.introButton} onClick={onButtonClick}>
        완료·맵으로 돌아가기
      </button>
    </div>
  );
};

export default StageClearBanner;