# finger-journey-frontend

## Git Convention

### 1. Commit Message Structure

커밋 메시지는 기본적으로 **제목(Subject), 본문(Body), 꼬리말(Footer)** 세 부분으로 구성합니다.  
각 영역은 한 줄을 띄워 구분합니다.

```text
type: subject

body

footer
```

- `Subject`는 필수로 작성합니다.
- `Body`와 `Footer`는 필요한 경우에만 작성합니다.

---

### 2. Commit Type

커밋 타입은 **영문 소문자**로 작성하며, 다음과 같은 형식을 사용합니다.

```text
type: subject
```

`:` 뒤에는 한 칸을 띄웁니다.

| Type | Description |
| --- | --- |
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 |
| `style` | 코드 포맷팅, 세미콜론 누락 등 코드 동작에 영향을 주지 않는 변경 |
| `refactor` | 코드 리팩토링 |
| `test` | 테스트 코드 추가 및 수정 |
| `chore` | 빌드 설정, 패키지 매니저 등 기타 설정 수정 |

#### 예시

```text
feat: 로그인 기능 구현
fix: 로그인 오류 수정
docs: README 수정
refactor: 회원 조회 로직 개선
chore: 패키지 설정 수정
```

---

### 3. Subject

제목은 다음 규칙에 따라 작성합니다.

- 제목은 **50자 이내**로 작성합니다.
- 제목 끝에 마침표를 사용하지 않습니다.
- 제목은 한글 작성을 원칙으로 하되, 기술 용어 및 고유 명칭은 영문 사용을 허용합니다.
- 불필요한 특수기호는 사용하지 않습니다.
- 간결하고 핵심적인 내용으로 작성합니다.


#### 한글 작성 예시

```text
feat: 회원가입 기능 구현
fix: 로그인 오류 수정
docs: API 명세 수정
refactor: UserService 로직 개선
```

---

### 4. Body

본문은 커밋에 대한 추가 설명이 필요한 경우 작성합니다.

- 한 줄은 **72자 이내**로 작성합니다.
- 무엇을 변경했는지 작성합니다.
- 필요한 경우 변경한 이유를 함께 작성합니다.
- 단순한 변경의 경우 본문은 생략할 수 있습니다.

#### 예시

```text
feat: 회원가입 기능 구현

SMS 및 이메일 중복 확인 기능 구현
회원가입 요청 데이터 검증 로직 추가
```

---

### 5. Footer

Footer는 **선택 사항**이며, 관련 GitHub Issue가 있는 경우 작성합니다.

```text
Resolves: #123
Ref: #456
Related to: #48, #45
```

| Type | Description |
| --- | --- |
| `Resolves` | 해당 커밋으로 해결되는 이슈 |
| `Ref` | 참고한 이슈 |
| `Related to` | 해당 커밋과 관련된 이슈 |

여러 개의 이슈를 작성할 경우 쉼표(`,`)로 구분합니다.

---

### 6. Commit Example

#### 간단한 커밋

```text
feat: 로그인 페이지 구현
```

#### 본문을 포함한 커밋

```text
feat: 로그인 기능 구현

이메일 및 비밀번호 입력 기능 구현
로그인 요청 API 연동
```

#### Issue를 포함한 커밋

```text
feat: 회원가입 기능 구현

SMS 및 이메일 중복 확인 API 구현
회원가입 요청 데이터 검증 로직 추가

Resolves: #123
Ref: #456
Related to: #48, #45
```