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
  { taskCode: 'QUZ', label: '징검다리 퀴즈' },
  { taskCode: 'WIK', label: '핑거위키' },
  { taskCode: 'CHT', label: '챗봇' },
  { taskCode: 'ADM', label: '어드민' },
];

const QUIZ_SHORTCUTS = [
  ['PTH_QUZ_C01', '음식 퀴즈 · 커피 취향'],
  ['PTH_QUZ_C02', '음식 퀴즈 · 점심 취향'],
  ['PTH_QUZ_C03', '음식 퀴즈 · 맵기 레벨'],
  ['PTH_QUZ_C04', '음식 퀴즈 CLEAR'],
  ['PTH_QUZ_C05', '휴식 퀴즈 · 쉬는 날'],
  ['PTH_QUZ_C06', '휴식 퀴즈 · 좋아하는 계절'],
  ['PTH_QUZ_C07', '휴식 퀴즈 · 여행 스타일'],
  ['PTH_QUZ_C08', '휴식 퀴즈 CLEAR'],
  ['PTH_QUZ_C09', '협업 퀴즈 · 친해지는 방법'],
  ['PTH_QUZ_C10', '협업 퀴즈 · 출근길 콘텐츠'],
  ['PTH_QUZ_C11', '협업 퀴즈 · 협업 스타일'],
  ['PTH_QUZ_C12', '협업 퀴즈 CLEAR'],
].map(([screenCode, screenName]) => ({
  taskCode: 'QUZ',
  screenCode,
  screenName,
  quizShortcut: true,
}));

export default function ScreenNavigationPanel({ screens }) {
  const [isOpen, setIsOpen] = useState(true);
  const currentPath = useNavigationStore((state) => state.nowPageParams.path);
  const goForward = useNavigationStore((state) => state.goForward);

  const screenGroups = useMemo(() => {
    const groups = [...screens, ...QUIZ_SHORTCUTS].reduce((groups, screen) => {
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

  const moveToScreen = (screen) => {
    if (screen.quizShortcut) {
      goForward('PTH_MAP_P01', { quizCode: screen.screenCode });
      return;
    }

    goForward(screen.screenCode);
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
                    onClick={() => moveToScreen(screen)}
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
