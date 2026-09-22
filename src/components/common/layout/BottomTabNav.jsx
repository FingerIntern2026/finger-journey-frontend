// 역할: 관리자 화면 전체(ADM_EMP_P01/ADM_PRG_P01/ADM_HRC_P01 등)에서 고정으로 쓰는 하단 탭바.
//       AdminHeader와 세트로 관리자 레이아웃을 구성함 (인터페이스 명세서 3.3.5).
//       스타일은 layout.module.css 사용
// 사용처: ComponentListPage.jsx (컴포넌트 데모)
// 담당자:
import { User, BookOpen, TrendingUp, Bell } from 'lucide-react';
import styles from './layout.module.css';

// tabs에 넘어오는 icon 문자열 키 -> 실제 아이콘 컴포넌트 매핑
const ICON_MAP = {
  user: User,
  wiki: BookOpen,
  progress: TrendingUp,
  bell: Bell,
};

const BottomTabNav = ({ tabs, active, onChange }) => {
  return (
    <nav className={styles.bottomTabNav}>
      {tabs.map((tab) => {
        const Icon = ICON_MAP[tab.icon];
        const isActive = tab.path === active;
        return (
          <button
            key={tab.path}
            className={`${styles.bottomTabItem} ${isActive ? styles.bottomTabItemActive : ''}`}
            onClick={() => onChange(tab.path)}
          >
            {Icon && <Icon size={20} />}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomTabNav;
