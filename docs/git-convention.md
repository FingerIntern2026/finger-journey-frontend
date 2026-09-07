# Git Convention

## 1. Branch Strategy

프로젝트는 `main`, `develop`, 작업 브랜치를 기준으로 관리합니다.

```text
main
 ↑
 │ PR
 │
develop
 ↑
 ├── feature/gyuwon/login
 ├── feature/jiyeon/onboarding
 └── feature/jaewoong/wiki
```

### 브랜치 역할

| Branch | Description |
| --- | --- |
| `main` | 최종적으로 배포 가능한 안정적인 코드를 관리 |
| `develop` | 개발된 기능을 통합하고 테스트하는 브랜치 |
| `feature/본인이름/*` | 개인별 기능 개발을 진행하는 브랜치 |
| `fix/본인이름/*` | 버그 수정 작업을 진행하는 브랜치 |

### 작업 흐름

```text
develop
→ 작업 브랜치 생성
→ 기능 개발
→ commit
→ push
→ Pull Request
→ develop에 merge
→ 기능 통합 및 테스트
→ develop에서 main으로 Pull Request
→ 확인 후 main에 merge
```

- `main`과 `develop` 브랜치에서는 직접 기능을 개발하지 않습니다.
- 작업 브랜치는 `develop`을 기준으로 생성합니다.
- 작업 완료 후 Pull Request를 통해 `develop`에 병합합니다.
- 기능 통합 및 테스트가 완료되면 `develop`에서 `main`으로 Pull Request를 생성합니다.
- 확인이 완료된 코드만 `main`에 병합합니다.

---

## 2. Branch Naming

작업 브랜치는 **작업 유형 / 작업자 이름 / 작업 내용** 순서로 작성합니다.

```text
type/name/task
```

### Feature

새로운 기능을 개발하는 경우:

```text
feature/gyuwon/login
feature/gyuwon/ai-report
feature/jiyeon/preboarding
feature/jaewoong/wiki
```

### Fix

버그를 수정하는 경우:

```text
fix/gyuwon/login-error
fix/jiyeon/layout-error
```

### Naming Rules

- 브랜치 이름은 영문 소문자로 작성합니다.
- 작업 내용은 간결하게 작성합니다.
- 여러 단어가 필요한 경우 `kebab-case`를 사용합니다.

```text
feature/gyuwon/email-guide
feature/gyuwon/ai-report
```

---

## 3. Commit Convention

### Commit Structure

커밋 메시지는 다음 형식을 사용합니다.

```text
type: subject

body

footer
```

- `Subject`는 필수로 작성합니다.
- `Body`와 `Footer`는 필요한 경우에만 작성합니다.
- 각 영역은 한 줄을 띄워 구분합니다.

### Commit Type

| Type | Description |
| --- | --- |
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 |
| `style` | 코드 동작에 영향을 주지 않는 스타일 변경 |
| `refactor` | 코드 리팩토링 |
| `test` | 테스트 코드 추가 및 수정 |
| `chore` | 빌드 설정, 패키지 등 기타 설정 수정 |

### Commit Rules

- `type`은 영문 소문자로 작성합니다.
- `:` 뒤에는 한 칸을 띄웁니다.
- 제목은 50자 이내로 작성합니다.
- 제목 끝에 마침표를 사용하지 않습니다.
- 제목은 한글 작성을 원칙으로 합니다.
- 기술 용어 및 고유 명칭은 영문 사용을 허용합니다.
- Body는 추가 설명이 필요한 경우 작성합니다.
- Body는 무엇을 변경했는지 작성하고, 필요한 경우 변경 이유를 함께 작성합니다.
- Footer는 관련 GitHub Issue가 있는 경우 작성합니다.

### Commit Example

간단한 커밋:

```text
feat: 로그인 페이지 구현
```

본문을 포함한 커밋:

```text
feat: 로그인 기능 구현

이메일 및 비밀번호 입력 기능 구현
로그인 요청 API 연동
```

Issue를 포함한 커밋:

```text
feat: 회원가입 기능 구현

SMS 및 이메일 중복 확인 API 구현
회원가입 요청 데이터 검증 로직 추가

Related to: #12
```

이슈를 자동으로 종료해야 하는 경우 GitHub Closing Keyword를 사용합니다.

```text
Fixes #12
Closes #12
Resolves #12
```

---

## 4. Pull Request Convention

### PR Rules

- 기능 개발 및 버그 수정이 완료되면 Pull Request를 생성합니다.
- `feature/*`, `fix/*` 브랜치는 `develop` 브랜치로 PR을 생성합니다.
- 기능 통합 및 테스트가 완료되면 `develop`에서 `main`으로 PR을 생성합니다.
- 하나의 PR에는 하나의 작업 목적만 포함하는 것을 원칙으로 합니다.
- PR 생성 후 다른 팀원의 확인을 거쳐 Merge합니다.

### PR Title

PR 제목은 Commit Convention과 동일한 Type을 사용합니다.

```text
type: 작업 내용
```

예시:

```text
feat: 로그인 기능 구현
fix: 로그인 페이지 오류 수정
docs: README 수정
refactor: 온보딩 로직 개선
```

- 제목은 한글 작성을 원칙으로 합니다.
- 기술 용어 및 고유 명칭은 영문 사용을 허용합니다.
- PR의 핵심 작업 내용을 간결하게 작성합니다.

### PR Description

PR 본문은 다음 형식을 사용합니다.

```text
## 작업 내용

- 로그인 페이지 구현
- 로그인 API 연동
- 로그인 실패 시 오류 메시지 처리

## 확인 사항

- [ ] 정상적으로 동작하는지 확인
- [ ] 기존 기능에 영향을 주지 않는지 확인

## 관련 이슈

Related to: #12
```

### Review

- PR 생성 후 다른 팀원이 변경 사항을 확인합니다.
- 수정이 필요한 경우 Comment 또는 Review를 통해 의견을 남깁니다.
- 필요한 수정 사항을 반영한 후 Merge합니다.
- 특별한 경우를 제외하고 다른 팀원의 확인 후 Merge합니다.

---

## 5. Merge Convention

### Merge Flow

작업 브랜치는 `develop`에 통합하고,
통합 및 테스트가 완료된 `develop` 브랜치를 `main`에 병합합니다.

```text
feature/gyuwon/login
   ├─ commit 1
   ├─ commit 2
   └─ commit 3
        │
        │ Squash and merge
        ▼
develop
   ├─ feat: 로그인 기능 구현
   ├─ feat: 온보딩 기능 구현
   └─ feat: 위키 기능 구현
        │
        │ Create a merge commit
        ▼
main
```

### Merge Method

#### `feature/*`, `fix/*` → `develop`

**`Squash and merge`** 방식을 사용합니다.

- 작업 브랜치의 여러 커밋을 하나의 기능 단위 커밋으로 정리합니다.
- Squash 시 최종 커밋 메시지는 Commit Convention에 맞게 작성합니다.

```text
feature/gyuwon/login

feat: 로그인 화면 구현
feat: 로그인 API 연동
fix: 로그인 버튼 오류 수정

        ↓ Squash and merge

develop

feat: 로그인 기능 구현
```

#### `develop` → `main`

**`Create a merge commit`** 방식을 사용합니다.

- `develop`에 정리된 기능별 커밋 이력을 유지한 상태로 병합합니다.
- 기능 통합 및 테스트가 완료된 경우에만 `main`으로 병합합니다.

### Merge 완료 후

- Merge가 완료된 `feature/*`, `fix/*` 브랜치는 삭제합니다.
- `develop` 브랜치는 삭제하지 않고 지속적으로 사용합니다.
- `main`과 `develop`에는 직접 Push하지 않습니다.
- `main` 브랜치는 배포 가능한 안정적인 상태를 유지합니다.