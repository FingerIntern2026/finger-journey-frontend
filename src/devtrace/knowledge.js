// knowledge.js의 역할
// DevTrace 패널이 보여주는 "이 API/유틸/라우트는 실제로 무슨 역할이다"라는 설명을
// 모아둔 순수 데이터. 백엔드는 별도 서버(Spring/FastAPI)라 프론트가 런타임에
// 소스코드를 읽어올 방법이 없어서, 여기에 미리 사람이 적어둔 설명을 보여줌.
//
// 새 API/유틸/라우트가 생기면 여기에도 한 줄 추가해야 함 (자동 동기화 아님).

// url은 접두사 매칭(예: "/admin/employee"로 시작하면 매칭)
export const ENDPOINT_KNOWLEDGE = [
  {
    url: '/admin/employee/list',
    backend: 'EmployeeController.getEmployeeList() → EmployeeService',
    note: '사원 전체 목록 조회',
  },
  {
    url: '/admin/employee/detail',
    backend: 'EmployeeController.getEmployeeDetail() → EmployeeService',
    note: '사원 상세 조회',
  },
  {
    url: '/admin/employee/create',
    backend: 'EmployeeController.createEmployee() → EmployeeService',
    note: '사원 등록',
    errors: { ADM_003: '이미 등록된 사번' },
  },
  {
    url: '/admin/employee/update',
    backend: 'EmployeeController.updateEmployee() → EmployeeService',
    note: '사원 정보 수정',
  },
  {
    url: '/admin/employee/delete',
    backend: 'EmployeeController.deleteEmployee() → EmployeeService',
    note: '사원 삭제',
  },
  {
    url: '/quiz/questions',
    backend: 'QuizController.getQuestions() → QuizService',
    note: '징검다리 퀴즈 9문항을 displayOrder 순으로 조회',
  },
  {
    url: '/quiz/answers/my',
    backend: 'QuizController.getMyAnswers() → QuizService',
    note: '사원의 기존 퀴즈 응답 조회',
  },
  {
    url: '/quiz/answers',
    backend: 'QuizController.saveAnswers() → QuizService',
    note: '문항별 선택값을 일괄 저장. 이미 응답한 문항이 하나라도 섞여 있으면 전체를 막음',
    errors: { QUZ_002: '이미 응답한 문항입니다 (중복 응답 방지)' },
  },
  {
    url: '/complete/poem/my',
    backend: 'PoemController.getMyPoem() → PoemService',
    note: '저장된 3행시 조회',
    errors: { CPL_002: '저장된 3행시가 없음' },
  },
  {
    url: '/complete/poem',
    backend: 'PoemController.savePoem() → PoemService',
    note: '3행시 저장. 이름 글자수와 lines 배열 길이가 다르면 막힘. 기존 3행시가 있으면 덮어씀',
    errors: { CPL_001: '입력 형식이 이름 글자 수와 일치하지 않음' },
  },
  {
    url: '/path/acrostic',
    backend: '(존재하지 않는 더미 경로)',
    note: 'ComponentListPage의 AcrosticInputForm 데모가 apiUrl을 안 넘기면 이 기본값으로 실제 요청을 쏨 — 404가 정상',
  },
  {
    url: '/api/reports/detail',
    backend: 'ReportController.detail() → ReportService.getReportDetail()',
    note: '기존에 생성된 리포트 조회',
    errors: { CPL_004: '생성된 리포트가 없음' },
  },
  {
    url: '/api/reports/generate',
    backend: 'ReportController.generate() → ReportService.generateReport()',
    note:
      '퀴즈 9개+3행시 조회 → 부족하면 CPL_003 → GENERATING 저장 → finger-journey-ai(FastAPI) 호출 → COMPLETED/FAILED 저장. "근거가 된 퀴즈 답변" 비율은 AI가 아니라 여기서 QuizResponse를 직접 집계함',
    errors: {
      CPL_003: '퀴즈 또는 3행시가 완료되지 않아 리포트를 생성할 수 없음',
      CPL_005: '이미 생성된 리포트가 있음',
    },
  },
  {
    url: '/api/chat',
    backend: 'finger-journey-ai(FastAPI) main.py chat() — Spring을 거치지 않고 직접 호출',
    note: 'DB 조회가 필요 없는 챗봇이라 axios(Spring)가 아니라 raw fetch로 AI 서버(:8000)를 직접 호출',
  },
];

export function findEndpointKnowledge(url) {
  return ENDPOINT_KNOWLEDGE.find((e) => url?.startsWith(e.url)) ?? null;
}

// key는 traced()에 넘긴 name (예: "parseApiError")
export const UTIL_KNOWLEDGE = {
  parseApiError: {
    source: 'src/utils/apiError.js',
    role: '서버 에러를 {code, message} 형태로 정규화',
    why: '화면마다 err.response.data를 각자 다르게 파싱하면 에러 표시가 제각각이 됨. 서버 응답 자체가 없는 네트워크 에러와, 서버가 준 에러코드를 구분해서 항상 같은 모양으로 돌려줌',
  },
  getIsLoggedIn: {
    source: 'src/utils/authStorage.js',
    role: 'localStorage의 로그인 상태 읽기',
    why: "useAuth.js와 MoveGuidePage.jsx가 'isLoggedIn' 키를 직접 안 건드리고 이 함수만 거치게 해서, 두 화면이 항상 같은 값을 보게 보장",
  },
  setIsLoggedIn: {
    source: 'src/utils/authStorage.js',
    role: 'localStorage에 로그인 상태 저장',
    why: 'getIsLoggedIn과 짝. boolean ↔ 문자열 변환을 이 함수 뒤로 숨김',
  },
  getHighlightSegments: {
    source: 'src/utils/highlight.js',
    role: '텍스트를 검색어 기준으로 조각내서 [{text, matched}] 배열로 반환',
    why: 'JSX(<mark>)를 포함하지 않는 순수 함수로 분리해서, 위키 검색 등 다른 화면에서도 재사용 가능하게 함',
  },
  formatDate: {
    source: 'src/utils/date.js',
    role: 'ISO 날짜 문자열을 "2026년 9월 22일" 형태로 변환',
    why: '관리자 화면에서 날짜 표기를 통일하기 위해 미리 준비 (현재 실제 호출부는 없음)',
  },
  daysSince: {
    source: 'src/utils/date.js',
    role: '오늘 기준 며칠 지났는지 계산',
    why: '"입사 D+12" 같은 표시용으로 미리 준비 (현재 실제 호출부는 없음)',
  },
  checkDuplicateEmployeeNo: {
    source: 'src/utils/checkDuplicateEmployeeNo.js',
    role: '사번이 이미 등록된 목록에 있는지 검사',
    why: '저장 요청을 보내기 전에 프론트에서 먼저 걸러내기 위한 순수 함수 (현재 실제 호출부는 없음)',
  },
  fetchScreenList: {
    source: 'src/utils/screenConfig.js',
    role: '화면정보 목록을 앱 시작 시 불러와 메모리에 캐싱',
    why: '현재는 백엔드 API와 같은 형태의 로컬 목록을 사용하고, API가 제공되면 데이터 공급부만 교체할 수 있게 분리',
  },
  findScreenByCode: {
    source: 'src/utils/screenConfig.js',
    role: '화면 코드로 화면정보를 찾기',
    why: '페이지가 URL을 직접 사용하지 않고 화면 코드로 이동하기 위한 공통 조회 함수',
  },
  'historyStack.push': {
    source: 'src/utils/historyStack.js',
    role: '화면 이동 기록을 쌓음',
    why: 'navigate(-1)은 브라우저 히스토리만 다룰 뿐 "어디서 어떤 값을 들고 왔는지"는 기억 못 해서, 이걸 대신 기억해두는 모듈 스코프 배열',
  },
  'historyStack.pop': {
    source: 'src/utils/historyStack.js',
    role: '마지막 이동 기록을 꺼내면서 제거',
    why: 'goBack이 호출하지만, 반환값(prevParams)은 현재 아무도 안 읽어서 절반만 완성된 기능',
  },
};

export function findUtilKnowledge(name) {
  return UTIL_KNOWLEDGE[name] ?? null;
}

// key는 화면 목록의 routePath 값
export const ROUTE_KNOWLEDGE = {
  '/demo': '데모 허브 — 5개 기능 진입점',
  '/demo/move': '화면이동 예제 허브',
  '/demo/move/auth-check': 'ProtectedRoute로 감싸인 화면. 로그인 안 돼있으면 /demo/move로 강제 리다이렉트',
  '/demo/move/param': '파라미터 전달 데모 (목록)',
  '/demo/param-detail': '파라미터 전달 데모 (상세) — location.state로 값을 받음',
  '/demo/move/go-back': 'goBack/goTo 데모',
  '/demo/components': '공통/커스텀 컴포넌트 목록 (탭+아코디언)',
  '/demo/dialog': 'Alert/Confirm/Quiz 다이얼로그 데모',
  '/demo/api': '사원 CRUD API 통신 데모',
  '/demo/report': '완주 여정 데모 (퀴즈→3행시→리포트)',
  '/demo/report/result': 'AI 완주 리포트 결과 화면 — 진입 시 자동으로 리포트+3행시 조회',
};

export function findRouteKnowledge(pathname) {
  return ROUTE_KNOWLEDGE[pathname] ?? null;
}
