// 역할: 발표·퍼블리싱 확인 중 DB 화면정보 목록에서 원하는 화면으로 바로 이동하는 개발 보조 패널.
// 사용처: App.jsx
// 담당자: 김재웅

import { List, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import useNavigationStore from '../../../stores/useNavigationStore';
import styles from './screenNavigationPanel.module.css';

const PRESENTATION_TASKS = [
  { taskCode: 'PB', label: '프리보딩' },
  { taskCode: 'CHK', label: '체크인' },
  { taskCode: 'PTH', label: '온보딩' },
  { taskCode: 'WIK', label: '핑거위키' },
  { taskCode: 'CHT', label: '챗봇' },
  { taskCode: 'ADM', label: '어드민' },
];

export default function ScreenNavigationPanel({ screens }) {
  const [isOpen, setIsOpen] = useState(true);
  const currentPath = useNavigationStore((state) => state.nowPageParams.path);
  const goForward = useNavigationStore((state) => state.goForward);

  const screenGroups = useMemo(() => {
    const groups = screens.reduce((groups, screen) => {
      const group = groups.find((item) => item.taskCode === screen.taskCode);

      if (group) {
        group.screens.push(screen);
      } else {
        groups.push({ taskCode: screen.taskCode, screens: [screen] });
      }

      return groups;
    }, []);

    return groups.sort((left, right) => {
      const leftIndex = PRESENTATION_TASKS.findIndex((task) => task.taskCode === left.taskCode);
      const rightIndex = PRESENTATION_TASKS.findIndex((task) => task.taskCode === right.taskCode);

      return (leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex)
        - (rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex);
    });
  }, [screens]);

  const moveToScreen = (screenCode) => {
    goForward(screenCode);
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.toggleButton} ${isOpen ? styles.toggleHidden : ''}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? '화면 목록 닫기' : '화면 목록 열기'}
      >
        {isOpen ? <X size={18} /> : <List size={18} />}
      </button>

      <aside className={`${styles.panel} ${isOpen ? styles.open : ''}`} aria-label="화면 바로가기">
        <div className={styles.header}>
          <div>
            <strong>화면 바로가기</strong>
            <span>발표용 이동 패널</span>
          </div>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="화면 목록 닫기">
            <X size={17} />
          </button>
        </div>

        <nav className={styles.list}>
          {screenGroups.map((group) => {
            const task = PRESENTATION_TASKS.find((item) => item.taskCode === group.taskCode);

            return (
              <section key={group.taskCode} className={styles.group}>
                <h2>{task ? `${task.label} · ${group.taskCode}` : group.taskCode}</h2>
              {group.screens.map((screen) => {
                const isCurrent = screen.routePath === currentPath;

                return (
                  <button
                    key={screen.screenCode}
                    type="button"
                    className={isCurrent ? styles.currentScreen : ''}
                    disabled={isCurrent}
                    onClick={() => moveToScreen(screen.screenCode)}
                  >
                    <span>{screen.screenCode}</span>
                    <small>{screen.screenName}</small>
                  </button>
                );
              })}
              </section>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
