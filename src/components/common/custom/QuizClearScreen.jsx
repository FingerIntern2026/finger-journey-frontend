// 역할: 퀴즈 3세트(음식/휴식/협업) 클리어 화면 전용 컴포넌트. 일러스트만
//       세트마다 다르고 나머지(CLEAR!문구, 버튼)는 동일함. 뱃지+제목+진행률바는
//       Header 컴포넌트가 그리는 영역이라 여긴 포함 안 함
// 사용처: ComponentListPage.jsx(데모)
// 담당자:

import BaseButton from '../base/BaseButton';
import styles from './custom.module.css';

const QuizClearScreen = ({
  illustrationSrc,   // 필수. 퀴즈 세트별로 다른 일러스트 (예: 통나무 넘는 그림, 곰이랑 있는 그림)
  onButtonClick,      // 필수. "완료·맵으로 돌아가기" 버튼 눌렀을 때 실행할 함수
}) => {
  return (
    <div className={styles.quizClearScreen}>
      {/* "퀴즈 CLEAR!" 박스 - 모든 세트 공통 */}
      <div className={styles.quizClearBox}>
        <p className={styles.quizClearText}>퀴즈 CLEAR!</p>
      </div>

      {/* 일러스트만 세트마다 바뀜 */}
      <img src={illustrationSrc} alt="" className={styles.quizIllustration} />

      <BaseButton label="완료·맵으로 돌아가기" onClick={onButtonClick} fullWidth />
    </div>
  );
};

export default QuizClearScreen;