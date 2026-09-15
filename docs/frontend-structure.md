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
- 접근 권한 검사는 `ProtectedRoute.jsx`에서 처리합니다.
- Custom Hook은 역할별로 분리합니다.
- 공통으로 사용할 수 있는 코드는 중복 작성하지 않습니다.
- 컴포넌트 스타일은 폴더 단위 CSS Modules(`{폴더명}.module.css`)로 관리하며, 컴포넌트별 개별 CSS 파일은 만들지 않습니다.