// 역할: 오솔길(PTH) 세부 화면 상단에 공통으로 쓰이는 진행률 헤더.
//       왼쪽 뒤로가기 버튼, 가운데 상태 텍스트+진행률 바(+n/10), 오른쪽 새싹 아이콘으로 구성되며
//       화면마다 텍스트/진행률만 다르고 구조는 동일해서 props로 값만 받아 그려줌.
//       ⚠️ 오솔길 메인맵 전용 헤더는 PathMapHeader, 관리자 화면은 AdminHeader로 별도 분리되어
//       있고, PageLayout이 header prop으로 받아 조합함
// 사용처: PTH 각 Feature의 PageLayout header prop
// 담당자:
import { ChevronLeft } from 'lucide-react';
// ↑ 왼쪽 화살표 아이콘. lucide-react 라이브러리에서 가져와요.
import CustomProgressIndicator from '../../../common/custom/CustomProgressIndicator';
import styles from './PathLayout.module.css';

const Header = ({ label, current, total, onBack }) => {
  // label: 상단에 보여줄 텍스트 (예: "가방 싸는 중", "온보딩 진행 중")
  // current, total: 현재 단계와 전체 단계 (예: current=4, total=9 → "4/9" 표시)
  // onBack: Page에서 공통 네비게이션 스토어의 goBack을 전달
  // 진행률 바+새싹 아이콘은 CustomProgressIndicator(3.4.9)로 분리돼 있어 그대로 조합해서 씀
  // (배지는 headerCount에서 이미 n/10을 보여주므로 showBadge={false}로 중복 표시 방지)

  return (
    // 헤더 전체를 감싸는 영역
    <div className={styles.header}>
      {/* 상단 줄: 왼쪽엔 라벨 텍스트, 오른쪽엔 n/10 (있을 때만) */}
      <div className={styles.headerTop}>
        <span className={styles.headerLabel}>{label}</span>

        {/* current, total 둘 다 있을 때만 이 부분이 보임 (체크인 화면엔 안 보임) */}
        {current !== undefined && current !== null && total && (
          <span className={styles.headerCount}>{current}/{total}</span>
        )}
      </div>

      {/* 하단 줄: onBack 없으면 뒤로가기 버튼 자체를 안 그림 (예: 최상위 허브 화면).
          total 있으면 진행률 바+새싹까지 추가로 그림 */}
      <div className={styles.headerRow}>
        {onBack && (
          <button className={styles.headerBackBtn} onClick={() => onBack()} aria-label="뒤로가기">
            <ChevronLeft size={20} />
          </button>
        )}

        {total && (
          <CustomProgressIndicator
            current={current}
            total={total}
            showBadge={false}
            className={styles.headerProgressTrack}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
