// DevTracePanel.jsx의 역할
// 사용자가 데모 화면에서 뭔가를 누르면, 그 뒤에서 실제로 흘러간 코드 경로
// (클릭 → API/유틸 호출 → 화면이동/다이얼로그)를 실시간으로 보여주는 패널.
// App.jsx 최상위에 마운트하되, /demo/* 경로가 아니면 아무것도 렌더링하지 않음
// (실제 온보딩 화면이 나중에 붙어도 거기엔 안 나타나야 하므로 경로 기반으로 게이팅)

import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { subscribe, getFlows, clearFlows } from './traceContext';
import { addStep } from './traceContext';
import { installDevTrace } from './instrument';
import { findRouteKnowledge } from './knowledge';
import styles from './devTracePanel.module.css';

const LAYER_LABEL = {
  api: 'API',
  util: 'UTIL',
  nav: 'NAV',
  dialog: 'DIALOG',
  guard: 'GUARD',
  state: 'STATE',
};

const LAYER_CLASS = {
  api: styles.layerApi,
  util: styles.layerUtil,
  nav: styles.layerNav,
  dialog: styles.layerDialog,
  guard: styles.layerGuard,
  state: styles.layerState,
};

function StatusDot({ status }) {
  const cls =
    status === 'running' ? styles.statusRunning : status === 'error' ? styles.statusError : styles.statusDone;
  return <span className={`${styles.statusDot} ${cls}`} />;
}

function StepRow({ step }) {
  const [open, setOpen] = useState(false);
  const hasDetail = step.input != null || step.output != null || step.error || step.note;

  return (
    <div className={`${styles.step} ${step.error ? styles.stepError : ''}`}>
      <div className={styles.stepTop} onClick={() => hasDetail && setOpen((v) => !v)}>
        <span className={`${styles.layerBadge} ${LAYER_CLASS[step.layer] ?? ''}`}>
          {LAYER_LABEL[step.layer] ?? step.layer}
        </span>
        <span className={styles.stepLabel} title={step.label}>
          {step.label}
        </span>
        {step.durationMs != null && <span className={styles.stepDuration}>{step.durationMs}ms</span>}
      </div>

      {open && hasDetail && (
        <div className={styles.stepDetail}>
          {step.source && <div className={styles.stepSource}>{step.source}</div>}
          {step.backend && (
            <div className={styles.stepDetailRow}>
              <span className={styles.stepDetailKey}>backend: </span>
              {step.backend}
            </div>
          )}
          {step.input != null && (
            <div className={styles.stepDetailRow}>
              <span className={styles.stepDetailKey}>input: </span>
              {JSON.stringify(step.input)}
            </div>
          )}
          {step.output != null && (
            <div className={styles.stepDetailRow}>
              <span className={styles.stepDetailKey}>output: </span>
              {typeof step.output === 'string' ? step.output : JSON.stringify(step.output)}
            </div>
          )}
          {step.error && (
            <div className={styles.stepDetailRow}>
              <span className={styles.stepErrorText}>error: {step.error}</span>
            </div>
          )}
          {step.note && <div className={styles.stepDetailRow}>{step.note}</div>}
        </div>
      )}
    </div>
  );
}

function FlowCard({ flow, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const routeNote = findRouteKnowledge(flow.page);

  return (
    <div className={styles.flowCard}>
      <button className={styles.flowHeader} onClick={() => setOpen((v) => !v)}>
        <span className={styles.flowLabel} title={flow.label}>
          {flow.label}
        </span>
        <span className={styles.flowMeta}>
          <StatusDot status={flow.status} />
          {flow.steps.length}단계
        </span>
      </button>

      {open && (
        <div className={styles.stepList}>
          {flow.steps.length === 0 && flow.status !== 'running' ? (
            <div className={styles.stepSource}>외부 호출 없음 — 로컬 state만 바뀜</div>
          ) : (
            flow.steps.map((step) => <StepRow key={step.id} step={step} />)
          )}
          {routeNote && flow.origin === 'route' && <div className={styles.stepSource}>{routeNote}</div>}
        </div>
      )}
    </div>
  );
}

export default function DevTracePanel() {
  const location = useLocation();
  const [flows, setFlows] = useState(getFlows());
  // 넓은 화면(좌측 고정 패널)에서는 기본으로 펼쳐두지만, 좁은 화면(바텀시트)은
  // 패널이 하단 60%를 덮어버려서 데모 버튼을 가릴 수 있어 기본은 접어둠
  const [expanded, setExpanded] = useState(() => window.innerWidth >= 1024);
  const [networkOnly, setNetworkOnly] = useState(false);
  const lastPathRef = useRef(null);

  // 계측 설치는 앱 전체에 한 번만 (installDevTrace 내부에서 중복 설치를 막음)
  useEffect(() => {
    installDevTrace();
  }, []);

  // 라우트 변화 감시: useNavigation을 안 거치고 useNavigate를 직접 쓰는 화면
  // (MoveGuidePage, AuthCheckPage)도 여기서는 빠짐없이 잡힘
  useEffect(() => {
    if (lastPathRef.current === location.pathname) return; // StrictMode 이중 실행 방지
    lastPathRef.current = location.pathname;

    addStep(
      {
        layer: 'nav',
        label: `라우트 진입: ${location.pathname}`,
        source: 'react-router-dom',
        note: findRouteKnowledge(location.pathname),
      },
      { fallbackOrigin: 'route', page: location.pathname }
    );
  }, [location.pathname]);

  useEffect(() => subscribe(setFlows), []);

  const isDemoPath = location.pathname.startsWith('/demo');
  if (!isDemoPath) return null;

  const visibleFlows = networkOnly ? flows.filter((f) => f.steps.some((s) => s.layer === 'api')) : flows;

  if (!expanded) {
    return (
      <button className={styles.toggleButton} data-devtrace-root onClick={() => setExpanded(true)}>
        DevTrace ({flows.length})
      </button>
    );
  }

  return (
    <div className={styles.panel} data-devtrace-root>
      <div className={styles.header}>
        <span className={styles.title}>DevTrace</span>
        <div className={styles.headerActions}>
          <button
            className={`${styles.headerButton} ${networkOnly ? styles.headerButtonActive : ''}`}
            onClick={() => setNetworkOnly((v) => !v)}
          >
            네트워크만
          </button>
          <button className={styles.headerButton} onClick={clearFlows}>
            지우기
          </button>
          <button className={styles.headerButton} onClick={() => setExpanded(false)}>
            접기
          </button>
        </div>
      </div>

      <div className={styles.flowList}>
        {visibleFlows.length === 0 && <div className={styles.emptyHint}>버튼을 눌러보면 여기 흐름이 쌓입니다.</div>}
        {visibleFlows.map((flow, index) => (
          <FlowCard key={flow.id} flow={flow} defaultOpen={index === 0} />
        ))}
      </div>
    </div>
  );
}
