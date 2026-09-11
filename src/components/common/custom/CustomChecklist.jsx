// CustomChecklist.jsx
// 체크박스+라벨 여러 개를 세로로 묶어서 보여주는 컴포넌트예요.
// HR 관리(ADM_HRC_P01, 5항목), 업무장비 지급 확인 화면에서 재사용해요.
// 각 항목이 실제로 체크됐는지는 부모(페이지)가 관리하고,
// 여긴 "배열 개수만큼 줄을 그려주는 일"만 해요.

import BaseCheckbox from '../base/BaseCheckbox';
import BaseCard from '../base/BaseCard';
import styles from './custom.module.css';

const CustomChecklist = ({
  items,          // 필수. [{ id, label, checked }] 형태의 배열
  onToggle,       // 필수. 항목 하나 클릭했을 때 실행할 함수. (itemId)를 인자로 넘겨줌
}) => {
  return (
    <BaseCard className={styles.checklistCard}>
      {/* items 배열 길이만큼 자동으로 줄이 생김 - 5개든 3개든 코드 안 고쳐도 됨 */}
      {items.map((item) => (
        <div key={item.id} className={styles.checklistRow}>
          <BaseCheckbox
            checked={item.checked}
            onChange={() => onToggle(item.id)}
          />
          <span className={styles.checklistLabel}>{item.label}</span>
        </div>
      ))}
    </BaseCard>
  );
};

export default CustomChecklist;