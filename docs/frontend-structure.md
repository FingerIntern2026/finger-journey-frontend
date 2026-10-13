# Frontend Project Structure

본 프로젝트의 프론트엔드는 React, Vite, Zustand를 사용합니다. 화면의 등록정보는 백엔드 DB에서 관리하고, 프론트엔드는 해당 정보를 이용해 페이지를 동적으로 불러옵니다.

## 1. 디렉터리 구조

```text
src/
├─ api/                         # HTTP 요청과 공통 Axios 클라이언트
├─ assets/                      # 번들에 포함되는 이미지 등 정적 자원
├─ components/
│  ├─ common/                   # 여러 업무에서 재사용하는 UI
│  │  ├─ base/                  # Button, Input 등 기본 UI
│  │  ├─ custom/                # 기본 UI를 조합한 공통 UI
│  │  ├─ dialog/                # Alert, Confirm, Popup
│  │  ├─ feedback/              # Loading 등 상태 안내 UI
│  │  └─ layout/                # Header, PageLayout 등 화면 골격
│  └─ feature/                  # 업무별 실제 화면 UI
│     ├─ ADM/
│     ├─ PB/
│     ├─ PTH/
│     └─ WIK/
├─ config/                      # 앱 시작 화면, API 주소 등 정적 설정
├─ hooks/                       # 여러 컴포넌트에서 재사용하는 React Hook
├─ pages/                       # DB 화면 코드와 1:1로 대응하는 진입 컴포넌트
│  ├─ adm/
│  ├─ chk/
│  ├─ cht/
│  ├─ pb/
│  ├─ pth/
│  └─ wik/
├─ routes/                      # DB 화면정보와 페이지 렌더링 연결
├─ services/                    # API 응답 검증, 가공, 캐시, 조회
├─ stores/                      # Zustand 등 전역 상태
├─ utils/                       # 화면 상태에 의존하지 않는 범용 함수
├─ App.jsx
└─ main.jsx
```

## 2. 화면정보와 렌더링

백엔드의 화면정보가 화면 코드, URL, 페이지 파일의 기준입니다.

```text
screenCode  화면 이동 시 사용하는 식별자
routePath   브라우저 URL 경로
filePath    src/pages 아래의 페이지 파일 경로
```

예시:

```text
screenCode: CHK_INT_P01
routePath:  /checkin/password
filePath:   chk/CHK_INT_P01.jsx
```

앱의 화면 로딩 흐름은 다음과 같습니다.

```text
App.jsx
→ screenService에서 화면 목록 로딩 및 검증
→ URL 또는 시작 화면으로 navigation store 초기화
→ AppRoutes
→ ScreenRenderer
→ screenLoader가 filePath의 페이지를 동적 import
```

페이지 파일명과 기본 export 이름은 화면 코드와 일치시킵니다.

```text
pages/chk/CHK_INT_P01.jsx
pages/pth/str/PTH_STR_P01.jsx
pages/wik/WIK_INT_P01.jsx
```

페이지 파일을 이동하거나 이름을 변경하면 백엔드 화면정보의 `filePath`도 함께 변경해야 합니다.

## 3. Page와 Feature의 역할

### `pages/`

페이지는 DB 화면 코드에 대응하는 진입점입니다. 다음 역할만 담당하는 것을 원칙으로 합니다.

- `useNavigationStore`를 이용한 화면 이동 연결
- API 또는 상태 Hook 연결
- 화면에 필요한 데이터 준비
- Feature 컴포넌트 조립

```jsx
export default function PTH_STR_P01() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);

  return (
    <FingerStoryPage
      step={1}
      onBack={goBack}
      onNext={() => goForward("PTH_STR_P02")}
    />
  );
}
```

### `components/feature/`

Feature 컴포넌트는 업무 화면의 실제 UI를 담당합니다.

- 실제 화면 마크업
- 입력값 등 화면 내부 상태
- 업무별 카드, 목록, 완료 화면
- 버튼 렌더링과 UI 이벤트 전달

Feature 컴포넌트는 가능한 한 이동 대상 화면 코드를 직접 알지 않고 `onNext`, `onBack`, `onComplete` 같은 callback을 받습니다.

```jsx
export default function FingerStoryPage({ step, onBack, onNext }) {
  return (
    <PageLayout header={<Header onBack={onBack} />}>
      <FingerStoryContent step={step} />
      <BaseButton label="다음" onClick={onNext} />
    </PageLayout>
  );
}
```

### `components/common/`

두 개 이상의 업무에서 재사용할 수 있는 UI를 관리합니다.

| Directory | Description |
| --- | --- |
| `base/` | Button, Input 등 가장 작은 UI |
| `custom/` | Base 컴포넌트를 조합한 재사용 UI |
| `dialog/` | Alert, Confirm, Popup |
| `feedback/` | Loading, Error, Empty 등 상태 UI |
| `layout/` | PageLayout, Header 등 화면 골격 |

목적지가 같다는 이유만으로 화면 전체를 공통 컴포넌트로 만들지 않습니다. 마크업, 스타일, 동작이 실제로 반복될 때만 공통화합니다.

## 4. 내비게이션 규칙

모든 페이지는 `stores/useNavigationStore.js`의 공통 액션을 사용합니다.

```jsx
const goForward = useNavigationStore((state) => state.goForward);
const goBack = useNavigationStore((state) => state.goBack);
```

```jsx
goForward("CHK_EXP_P01");
goForward("PTH_CPL_P02", { employeeName, lines });
goBack();
```

- `goForward(screenCode, params)`는 캐시된 DB 화면정보에서 `routePath`를 조회합니다.
- 이동 시 브라우저 URL과 Zustand의 현재 화면을 함께 변경합니다.
- 앱 시작과 새로고침 시 현재 URL에 대응하는 화면을 복원합니다.
- 브라우저 뒤로/앞으로 가기는 `popstate`를 통해 Zustand와 동기화합니다.
- 업무별로 동일한 내용을 복제한 navigation Hook을 만들지 않습니다.
- 업무 고유의 복잡한 이동 정책이 생긴 경우에만 도메인 Hook을 추가합니다.

PTH 완료 화면은 페이지에서 지도 이동을 명시합니다.

```jsx
<FingerStoryClear
  onBack={goBack}
  onComplete={() => goForward("PTH_MAP_P01")}
/>
```

## 5. CSS Modules 규칙

CSS Module은 스타일을 직접 사용하는 JSX 옆에 둡니다.

```text
페이지가 사용하는 스타일
pages/wik/WIK_LIS_P01.jsx
pages/wik/WIK_LIS_P01.module.css

Feature가 사용하는 스타일
components/feature/PTH/STR/FingerStoryPage.jsx
components/feature/PTH/STR/FingerStory.module.css

공통 컴포넌트가 사용하는 스타일
components/common/layout/Header.jsx
components/common/layout/layout.module.css
```

- 페이지 외곽 배치는 페이지 CSS에 둡니다.
- 실제 업무 UI 스타일은 Feature CSS에 둡니다.
- 공통 컴포넌트 스타일은 해당 common 폴더에 둡니다.
- JSX는 Feature에 두고 CSS만 pages에 두는 역방향 의존은 만들지 않습니다.
- 여러 화면이 거대한 CSS 파일 하나를 공유하면 공통 스타일과 화면 전용 스타일을 분리합니다.

## 6. API와 서비스

### `api/`

HTTP 요청 URL과 요청 데이터 전달을 담당합니다.

```text
client.js     공통 Axios 인스턴스와 요청 함수
screenApi.js  화면정보 목록 API 호출
```

### `services/`

API 응답을 애플리케이션에서 사용할 수 있도록 검증, 가공, 캐싱합니다.

`screenService.js`는 다음을 담당합니다.

- 화면정보 API 호출
- 필수 필드 검사
- 화면 코드와 경로 중복 검사
- `filePath`에 대응하는 실제 페이지 파일 검사
- 화면 목록 캐시
- 화면 코드 및 경로 기반 조회

## 7. 상태 관리

상태 범위에 따라 다음 방식을 사용합니다.

```text
컴포넌트 내부 상태       useState
컴포넌트 트리 공유 상태  React Context
화면 내비게이션 상태     Zustand
React 외부 로딩 상태     모듈 store + useSyncExternalStore
```

- `DialogContext`: 다이얼로그 스택과 실행 함수 공유
- `useNavigationStore`: 현재 화면, 파라미터, URL 이동 관리
- `loadingStore`: 진행 중인 API 요청 개수 관리

## 8. 파일 배치 기준

### `hooks/`

여러 컴포넌트에서 재사용하는 React Hook을 관리합니다. 커스텀 Hook은 `use`로 시작합니다. 한 화면에서만 쓰는 단순 함수는 가까운 페이지 또는 Feature에 둡니다.

### `stores/`

여러 화면이 공유하는 전역 상태와 액션을 관리합니다. Zustand의 `create()`로 만든 store Hook은 `hooks/`가 아니라 `stores/`에 둡니다.

### `utils/`

React 상태, 컴포넌트, API 요청에 의존하지 않는 범용 변환·검사 함수를 관리합니다.

### `config/`

앱 시작 화면 코드와 API 주소처럼 실행 중 거의 변경되지 않는 설정을 관리합니다. 전체 화면 코드 목록은 DB가 관리하므로 프론트에 중복 등록하지 않습니다.

## 9. 개발 규칙

- 페이지 이동은 `useNavigationStore`의 `goForward`, `goBack`을 사용합니다.
- `window.location`을 페이지 컴포넌트에서 직접 변경하지 않습니다.
- 화면 파일명과 기본 export 이름은 DB 화면 코드와 일치시킵니다.
- 화면 경로와 페이지 파일 경로는 DB의 `routePath`, `filePath`를 사용합니다.
- Page는 연결과 조립, Feature는 실제 UI를 담당합니다.
- CSS Module은 사용하는 JSX 옆에 둡니다.
- 파일 이동 시 import와 DB `filePath`를 함께 수정합니다.
- 작업 후 `npm run lint`와 `npm run build`를 실행합니다.

## 10. 배포 시 URL 처리

직접 URL 접속과 새로고침을 지원하려면 운영 서버가 프론트 경로를 `index.html`로 전달해야 합니다.

```text
정적 파일이 존재하면 해당 파일 제공
/api 요청은 백엔드로 전달
그 외 프론트 경로는 index.html 제공
```

SPA fallback이 없으면 `/checkin/password`, `/path/story/1` 같은 주소를 새로고침할 때 서버에서 404가 발생할 수 있습니다.
