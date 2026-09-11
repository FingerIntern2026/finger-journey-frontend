// LoginWebviewEmbed.jsx의 역할
// 외부 시스템(ERP, 포레스트 등) 로그인 화면을 감싸는 래퍼 + 안내 텍스트
// ERP 로그인확인, 포레스트 로그인확인(CHK_ACC_P01) 두 화면에서 공통으로 씀
//
// 두 가지 모드 지원:
// - src가 있으면 실제 iframe으로 라이브 웹뷰를 띄움 (ERP URL 확정 후)
// - src가 없고 previewImage만 있으면 정적 스크린샷을 보여줌 (지금 단계, 디자인과 동일)
// - 둘 다 없으면 최소한의 안내 문구만 보여주는 fallback
//
// height: 쓰는 곳마다 필요한 크기가 다를 수 있어서(실제 화면=전체 화면, 데모 카드=작게)
//         prop으로 받게 함. CSS에 고정값으로 박아두지 않음

import styles from './custom.module.css';

export default function LoginWebviewEmbed({
    src,
    previewImage,
    title = '로그인 화면 예시',
    guideText,
    height = 480,
    className = '',
}) {
    return (
        <div className={`${styles.webviewWrapper} ${className}`}>
            {guideText && <div className={styles.webviewGuide}>{guideText}</div>}

            {src ? (
                <iframe
                    src={src}
                    title={title}
                    className={styles.webviewFrame}
                    style={{ height }}
                />
            ) : previewImage ? (
                <img
                    src={previewImage}
                    alt={title}
                    className={styles.webviewPreviewImg}
                    style={{ height, objectFit: 'cover' }}
                />
            ) : (
                <div className={styles.webviewFallback} style={{ height }}>
                    실제 연동 URL/이미지가 아직 없어요. (더미 화면)
                </div>
            )}
        </div>
    );
}