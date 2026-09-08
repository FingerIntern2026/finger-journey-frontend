// BaseButton.jsx의 역할
// 프로젝트 전역에서 재사용하는 기본 버튼. 내부 상태 없이 props만으로 동작하는 controlled 컴포넌트

export default function BaseButton({ label, onClick, variant = 'primary', disabled = false }) {
    return (
        <button
            // 템플릿 리터럴로 공통 클래스 + variant별 클래스를 조합
            // variant='danger'면 "base-button base-button--danger"가 됨
            className={`base-button base-button--${variant}`}
            onClick={onClick}
            // disabled는 HTML 표준 속성. true면 브라우저가 자동으로 클릭 차단 + 스타일 비활성화 처리
            disabled={disabled}
        >
            {label}
        </button>
    );
}