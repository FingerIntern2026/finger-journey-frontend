// 역할: label, variant(색상), disabled, fullWidth 등을 받아 공통 버튼 UI를 그리는 컴포넌트
// 사용처: ComponentListPage.jsx, DemoIndexPage.jsx, ReportExamplePage.jsx, DialogExamplePage.jsx,
//        ApiExamplePage.jsx, MoveGuidePage.jsx, DialogQuiz.jsx, DialogAlert.jsx, DialogConfirm.jsx,
//        AcrosticResultScreen.jsx, IntroScreen.jsx, OfficeFloorMap.jsx, QuizClearScreen.jsx, StageClearBanner.jsx
// 담당자:

import styles from './base.module.css';

export default function BaseButton({
    label,
    onClick,
    variant = 'primary',
    disabled = false,
    fullWidth = false,
    className = '',
    ...rest // data-trace 같은 임의 속성을 실제 <button> DOM까지 그대로 전달
}) {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.full : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {label}
        </button>
    );
}