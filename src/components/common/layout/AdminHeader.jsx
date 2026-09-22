// 역할: 관리자 화면 8개 세트(입사자 관리, 위키 관리, 진행현황, HR확인 등)가 공유하는 전용 헤더.
//       일반 Header와 달리 뒤로가기가 없고, 서비스명+로그아웃만 노출. BottomTabNav와 세트로
//       관리자 레이아웃을 구성함 (인터페이스 명세서 4.6.1). 스타일은 layout.module.css 사용
// 사용처: ComponentListPage.jsx (컴포넌트 데모)
// 담당자:
import styles from './layout.module.css';

const AdminHeader = ({ title = '핑거저니 관리자', onLogout }) => {
  return (
    <div className={styles.adminHeader}>
      <span className={styles.adminHeaderTitle}>{title}</span>
      <button className={styles.adminHeaderLogoutBtn} onClick={onLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default AdminHeader;
