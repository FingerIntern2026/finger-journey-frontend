# Frontend Project Structure

본 프로젝트의 Frontend는 **React + Vite** 기반으로 구성합니다.

## 1. Project Structure

```text
src/
├─ components/
│  └─ common/
│     ├─ base/       # 기본 UI 컴포넌트
│     │  ├─ base.module.css   # base 폴더 공통 스타일 (CSS Modules)
│     │  ├─ BaseButton.jsx
│     │  └─ ...
│     ├─ custom/     # 공통 커스텀 컴포넌트
│     │  ├─ custom.module.css
│     │  └─ ...
│     ├─ dialog/     # Alert, Confirm, Modal
│     │  ├─ dialog.module.css
│     │  └─ ...
│     └─ layout/     # 공통 레이아웃
│        ├─ layout.module.css
│        └─ ...
│
├─ config/
│  ├─ apiConfig.js
│  └─ routeConfig.js
│
├─ hooks/
│  ├─ useDialog.js
│  ├─ useAuth.js
│  └─ ...
│
├─ api/
│  ├─ client.js
│  ├─ authApi.js
│  ├─ onboardingApi.js
│  ├─ wikiApi.js
│  └─ ...
│
├─ pages/
│  ├─ preboarding/
│  ├─ onboarding/
│  ├─ wiki/
│  ├─ report/
│  └─ ...
│
├─ routes/
│  ├─ AppRoutes.jsx
│  └─ ProtectedRoute.jsx
│
├─ App.jsx
└─ main.jsx
```

> `features/` 디렉터리는 현재 사용하지 않으며, 추후 프로젝트 규모가 커질 경우 도입을 검토합니다.

---

## 2. Directory Convention

### `components/`

여러 페이지에서 공통으로 사용하는 UI 컴포넌트를 관리합니다.

| Directory | Description |
| --- | --- |
| `base/` | Button, Input 등 기본 UI |
| `custom/` | Base 컴포넌트를 조합한 공통 컴포넌트 |
| `dialog/` | Alert, Confirm, Modal 등 |
| `layout/` | PageLayout, Header 등 공통 레이아웃 |

특정 페이지에서만 사용하는 컴포넌트는 해당 `pages/` 폴더 내부에서 관리하고,
여러 페이지에서 재사용하게 되면 `components/common/`으로 이동합니다.

스타일은 폴더 단위 CSS Modules(`{폴더명}.module.css`)로 관리하며,
컴포넌트별로 별도 CSS 파일을 만들지 않습니다.
(예: `components/common/base/base.module.css`)

### `config/`

프로젝트 공통 설정값을 관리합니다.

```text
apiConfig.js     # API Base URL 등 API 설정
routeConfig.js   # Route Path 상수
```

### `hooks/`

공통 로직을 Custom Hook으로 관리합니다.

```text
useDialog.js     # Dialog 관련 로직
useAuth.js       # 로그인 및 인증 관련 로직
```

하나의 Hook에 여러 기능을 작성하지 않고 역할별로 분리합니다.

### `api/`

Backend API 통신을 관리합니다.

```text
client.js          # 공통 API 요청 설정
authApi.js         # 인증 관련 API
onboardingApi.js   # 온보딩 관련 API
wikiApi.js         # 위키 관련 API
```

페이지에서 API 요청 코드를 반복해서 작성하지 않고 `api/`에 정의된 함수를 사용합니다.

### `pages/`

실제 화면을 기능 또는 도메인별로 관리합니다.

```text
pages/preboarding/PreboardingPage.jsx
pages/onboarding/OnboardingPage.jsx
pages/wiki/WikiPage.jsx
pages/report/ReportPage.jsx
```

### `routes/`

React Router 관련 코드를 관리합니다.

```text
AppRoutes.jsx        # 전체 Route 구성
ProtectedRoute.jsx   # 로그인 및 접근 권한 검사
```

Route Path는 `config/routeConfig.js`에서 관리합니다.

---

## 3. State Management

초기에는 Redux, Zustand 등의 별도 상태 관리 라이브러리를 사용하지 않습니다.

```text
컴포넌트 내부 상태     → useState
공유 상태             → React Context
공통 상태 처리 로직    → Custom Hook
```

로그인 및 인증 관련 로직은 `useAuth`를 통해 관리하며,
구체적인 인증 상태 저장 방식은 실제 인증 구현에 따라 결정합니다.

추후 상태 관리가 복잡해질 경우 별도 상태 관리 라이브러리 도입을 검토합니다.

### Context를 쓰는 이유

Context는 값을 컴포넌트 트리 아래로 prop을 일일이 넘기지 않고 전달하는 방법입니다.
`<Provider>`로 감싼 트리 **내부에서만** 값을 읽을 수 있다는 점이 핵심입니다 — 전역 변수처럼
"어디서든 접근 가능"한 게 아니라, "이 트리 범위 안에서만 접근 가능"하게 범위가 제한됩니다.
그래서 이 트리 밖의 다른 컴포넌트가 실수로 값을 건드릴 수 없고, 어떤 값이 어디까지 영향을
미치는지가 JSX 구조만 봐도 드러납니다.

실제 사용 예시: `src/components/common/dialog/DialogContext.jsx`
- `DialogProvider`가 `App.jsx` 최상단을 감싸고, 다이얼로그 스택(`dialogStack`)을 Context 값으로 관리합니다.
- 하위 컴포넌트는 `useDialog()`로 `showDialog`/`showAlert`/`showConfirm`만 꺼내 쓰고, 스택 자체를
  직접 조작하지 않습니다 — 다이얼로그를 열고 닫는 방법이 이 파일 하나로 통일됩니다.

### Context를 안 쓰는 경우

이 프로젝트의 `historyStack.js`(화면 이동 기록), `loadingStore.js`(전역 로딩 카운트)는
Context가 아니라 **모듈 스코프 변수**로 관리합니다. 이유는:
- 값이 바뀔 때마다 화면을 다시 그릴 필요가 없는 값이라 (React state로 들고 있을 이유가 없음)
- `src/api/client.js`의 axios 인터셉터처럼 **컴포넌트 트리 바깥**(React 렌더링 범위 밖)에서도
  값을 읽고 바꿔야 하는데, Context는 트리 안에서만 접근 가능하므로 이런 곳엔 애초에 쓸 수 없음

---

## 4. Naming Convention

| Type | Convention | Example |
| --- | --- | --- |
| Component | PascalCase | `BaseButton.jsx` |
| Page | PascalCase + Page | `OnboardingPage.jsx` |
| Hook | use + PascalCase | `useAuth.js` |
| Function / Variable | camelCase | `handleLogin` |
| Constant | UPPER_SNAKE_CASE | `API_BASE_URL` |
| URL | kebab-case | `/ai-report` |

---

## 5. Development Rules

- 공통 UI는 `components/common/`에 작성합니다.
- 페이지 전용 컴포넌트는 해당 `pages/` 폴더에서 관리합니다.
- API 통신 코드는 `api/`에 작성합니다.
- API 공통 설정은 `api/client.js`에서 관리합니다.
- Route Path는 `config/routeConfig.js`에서 관리합니다.
- 전체 Route 연결은 `routes/AppRoutes.jsx`에서 관리합니다.
- 접근 권한 검사(게이트)는 `ProtectedRoute.jsx`에서 처리합니다. `AppRoutes.jsx`가 화면정보 테이블의
  `screen_info.login_required` 값을 보고 필요한 화면만 자동으로 `ProtectedRoute`로 감싸주므로,
  개별 페이지 컴포넌트는 로그인 여부를 신경 쓸 필요가 없습니다.
  **`ProtectedRoute.jsx` 내부 로직(인증/인가 방식)은 업무 화면 개발자가 직접 수정하지 않습니다.**
  인증 방식 자체를 바꿔야 하면 이 파일 담당자(현재 재웅)와 먼저 상의합니다.
- Custom Hook은 역할별로 분리합니다.
- 공통으로 사용할 수 있는 코드는 중복 작성하지 않습니다.
- 컴포넌트 스타일은 폴더 단위 CSS Modules(`{폴더명}.module.css`)로 관리하며, 컴포넌트별 개별 CSS 파일은 만들지 않습니다.