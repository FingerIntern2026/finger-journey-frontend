# Frontend Project Structure

본 프로젝트의 Frontend는 React + Vite 기반으로 구성합니다.

## 1. Project Structure

```text
src/
├─ api/
│  ├─ client.js                 # 공통 HTTP 클라이언트
│  └─ screenApi.js              # 화면정보 API 요청
│
├─ components/
│  └─ common/
│     ├─ base/                  # Button, Input 등 기본 UI
│     │  ├─ button/
│     │  └─ base.module.css
│     ├─ custom/                # Base UI를 조합한 공통 UI
│     │  ├─ button/
│     │  └─ custom.module.css
│     ├─ dialog/                # Alert, Confirm, Popup
│     │  └─ dialog.module.css
│     ├─ feedback/              # Loading 등 상태 안내 UI
│     │  ├─ GlobalLoading.jsx
│     │  └─ feedback.module.css
│     └─ layout/                # Header, PageLayout 등 화면 배치
│        ├─ layout.module.css
│        └─ chatPanel.module.css
│
├─ config/
│  ├─ apiConfig.js              # 백엔드 및 AI 서버 주소
│  └─ screenCodes.js            # 화면 식별 코드 상수
│
├─ hooks/
│  ├─ useAuth.js                # 로그인 상태 조회
│  ├─ useDialog.js              # DialogContext 사용
│  └─ useGlobalLoading.js       # 전역 로딩 store 구독
│
├─ pages/
│  └─ demo/                     # 데모 화면
│
├─ routes/
│  ├─ AppRoutes.jsx             # 현재 경로에 맞는 화면 연결
│  ├─ ProtectedRoute.jsx        # 로그인 필요 화면 접근 검사
│  ├─ RouteErrorPage.jsx        # 공통 라우팅 오류 화면
│  ├─ ScreenErrorBoundary.jsx   # 화면 로딩 및 렌더링 오류 처리
│  ├─ ScreenRenderer.jsx        # 화면정보 기반 렌더링
│  └─ screenLoader.js           # filePath 기반 동적 import
│
├─ services/
│  └─ screenService.js          # 화면정보 검증, 캐시, 조회
│
├─ stores/
│  ├─ loadingStore.js           # 전역 API 로딩 상태
│  └─ useNavigationStore.js     # 내비게이션 전역 상태
│
├─ utils/
│  ├─ apiError.js
│  ├─ authStorage.js
│  ├─ checkDuplicateEmployeeNo.js
│  ├─ date.js
│  └─ highlight.js
│
├─ App.jsx
└─ main.jsx
```

## 2. Directory Convention

### `api/`

백엔드 HTTP 통신을 담당합니다.

```text
client.js     # 공통 Axios 인스턴스와 GET/POST 요청 함수
screenApi.js  # 화면정보 목록 API 호출
```

API 파일은 요청 URL과 요청 데이터 전달까지만 담당합니다. 응답 검증, 캐시, 조회처럼 애플리케이션에서 데이터를 사용하는 로직은 `services/`에서 처리합니다.

### `services/`

API 응답을 애플리케이션에서 사용할 수 있도록 검증, 가공, 캐싱하는 로직을 관리합니다.

`screenService.js`는 다음 역할을 담당합니다.

- 화면정보 API 호출 요청
- 화면정보 응답 형식 검사
- 화면 코드와 경로 중복 검사
- `filePath`에 대응하는 실제 화면 파일 검사
- 화면 목록 캐시
- 화면 코드 및 경로 기반 조회

화면정보를 불러오는 흐름은 다음과 같습니다.

```text
App.jsx
→ services/screenService.js
→ api/screenApi.js
→ api/client.js
→ Backend
```

### `components/`

여러 페이지에서 재사용하는 UI 컴포넌트를 관리합니다.

| Directory | Description |
| --- | --- |
| `base/` | Button, Input 등 가장 작은 기본 UI |
| `custom/` | Base 컴포넌트를 조합한 재사용 UI |
| `dialog/` | Alert, Confirm, Popup 등 다이얼로그 UI |
| `feedback/` | Loading, Error, Empty, Toast 등 상태 안내 UI |
| `layout/` | PageLayout, Header 등 화면 배치 UI |

특정 페이지에서만 사용하는 컴포넌트는 해당 `pages/` 폴더에서 관리하고, 여러 페이지에서 재사용하게 되면 `components/common/`으로 이동합니다.

스타일은 폴더 단위 CSS Modules(`{폴더명}.module.css`)로 관리합니다.

### `config/`

실행 중에 거의 변경되지 않는 프로젝트 공통 설정과 상수를 관리합니다.

```text
apiConfig.js    # 백엔드 및 AI 서버 주소
screenCodes.js  # 화면 식별 코드 상수
```

화면 코드는 `screenCodes.js`에서 관리하고, 실제 URL과 화면 파일 경로는 백엔드 화면정보의 `routePath`, `filePath`를 사용합니다.

### `hooks/`

React 컴포넌트에서 Context나 외부 상태를 쉽게 사용할 수 있도록 연결하는 커스텀 훅을 관리합니다.

```text
useAuth.js           # 로그인 상태 조회
useDialog.js         # DialogContext의 다이얼로그 기능 사용
useGlobalLoading.js  # loadingStore를 React에 연결
```

커스텀 훅은 `use`로 시작하며 `hooks/`에서 찾을 수 있도록 위치를 통일합니다. Zustand의 `create()`로 생성한 `useNavigationStore`도 Hook 형태로 호출하지만, 전역 상태 자체를 생성하고 관리하므로 `stores/`에 둡니다.

### `stores/`

여러 화면과 컴포넌트가 공유하는 전역 상태를 관리합니다.

```text
useNavigationStore.js  # 현재 화면, 화면 파라미터, 이동 기록 관리
loadingStore.js        # 진행 중인 API 요청 개수와 로딩 상태 관리
```

`useNavigationStore.js`는 Zustand 기반 store이고, `loadingStore.js`는 모듈 상태와 구독 방식으로 만든 외부 store입니다.

### `utils/`

특정 화면 상태에 의존하지 않는 범용 변환 및 검사 함수를 관리합니다.

```text
apiError.js                  # API 오류 형식 변환
authStorage.js               # 로그인 상태 저장 및 조회
checkDuplicateEmployeeNo.js  # 사번 중복 검사
date.js                      # 날짜 변환 및 계산
highlight.js                 # 검색어 일치 구간 분리
```

React Hook, 전역 상태, 컴포넌트, API 요청, 화면정보 캐시는 `utils/`에 두지 않습니다.

### `pages/`

실제 화면 컴포넌트를 화면 또는 도메인별로 관리합니다. 현재는 공통 기능을 확인하기 위한 데모 화면을 `pages/demo/`에서 관리합니다.

### `routes/`

DB 화면정보와 실제 React 페이지를 연결하고 화면 접근 및 오류를 처리합니다.

```text
AppRoutes.jsx            # 현재 내비게이션 경로에 맞는 화면 연결
ProtectedRoute.jsx       # 로그인 필요 화면 접근 검사
ScreenRenderer.jsx       # routePath와 filePath 기반 화면 렌더링
screenLoader.js          # filePath에 해당하는 페이지 동적 import
ScreenErrorBoundary.jsx  # 화면 로딩 및 렌더링 오류 처리
RouteErrorPage.jsx       # 공통 라우팅 오류 화면
```

화면 렌더링 흐름은 다음과 같습니다.

```text
useNavigationStore의 현재 경로
→ AppRoutes
→ ScreenRenderer
→ screenLoader
→ pages의 화면 컴포넌트
```

## 3. State Management

상태 범위와 사용 위치에 따라 다음 방식을 사용합니다.

```text
컴포넌트 내부 상태       → useState
컴포넌트 트리 공유 상태  → React Context
전역 내비게이션 상태     → Zustand
React 외부 로딩 상태     → 모듈 store + useSyncExternalStore
```

현재 적용 사례는 다음과 같습니다.

- `DialogContext`: 다이얼로그 스택과 실행 함수 공유
- `useNavigationStore`: 현재 화면, 파라미터, 이동 기록 관리
- `loadingStore`: 진행 중인 API 요청 개수 관리
- `useGlobalLoading`: `loadingStore`를 React에 연결

### Dialog Context

`DialogProvider`가 `App.jsx`에서 전체 화면을 감싸고 다이얼로그 스택을 관리합니다. 하위 컴포넌트는 `hooks/useDialog.js`를 통해 `showDialog`, `showAlert`, `showConfirm`을 사용하며 스택을 직접 변경하지 않습니다.

### Navigation Store

`stores/useNavigationStore.js`가 현재 화면 경로, 현재 화면 파라미터와 화면 이동 기록을 관리합니다. 화면 컴포넌트는 `goForward`, `goBack` 액션을 통해서만 내비게이션 상태를 변경합니다.

### Loading Store

`stores/loadingStore.js`는 API 요청 모듈처럼 React 컴포넌트 바깥에서도 상태를 변경해야 하므로 Context가 아닌 모듈 store로 관리합니다. React 컴포넌트는 `hooks/useGlobalLoading.js`를 통해 해당 상태를 구독합니다.

## 4. Naming Convention

| Type | Convention | Example |
| --- | --- | --- |
| Component | PascalCase | `BaseButton.jsx` |
| Page | PascalCase + Page | `ReportExamplePage.jsx` |
| Hook | use + PascalCase | `useAuth.js` |
| Store Hook | use + PascalCase + Store | `useNavigationStore.js` |
| Function / Variable | camelCase | `handleLogin` |
| Constant | UPPER_SNAKE_CASE | `API_BASE_URL` |
| URL | kebab-case | `/demo/report` |

## 5. Development Rules

- 공통 UI는 `components/common/`에 작성합니다.
- 페이지 전용 UI는 해당 `pages/` 폴더에서 관리합니다.
- 백엔드 HTTP 요청은 `api/`에 작성합니다.
- API 응답 검증, 가공, 캐시 로직은 `services/`에 작성합니다.
- 여러 화면에서 공유하는 전역 상태는 `stores/`에 작성합니다.
- React 커스텀 훅은 `hooks/`에 작성합니다.
- 범용 변환 및 검사 함수는 `utils/`에 작성합니다.
- 정적인 설정과 상수는 `config/`에 작성합니다.
- 화면 코드는 `config/screenCodes.js`에서 관리합니다.
- 화면 경로와 파일 경로는 백엔드 화면정보의 `routePath`, `filePath`를 사용합니다.
- 전체 화면 연결은 `routes/AppRoutes.jsx`와 `routes/ScreenRenderer.jsx`에서 처리합니다.
- 화면 파일의 동적 import는 `routes/screenLoader.js`에서 처리합니다.
- 로그인 필요 화면은 `routes/ProtectedRoute.jsx`에서 처리합니다.
- 컴포넌트 스타일은 폴더 단위 CSS Modules로 관리합니다.
- 파일을 이동할 때 모든 import, 주석, 문서 경로를 함께 수정합니다.
