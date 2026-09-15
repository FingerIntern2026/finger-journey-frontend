// LoginWebviewEmbed.jsx의 역할
// 외부 시스템(ERP, 포레스트 등) 로그인 화면을 감싸는 래퍼 + 안내 텍스트
// ERP 로그인확인, 포레스트 로그인확인(CHK_ACC_P01) 두 화면에서 공통으로 씀
//
// 두 가지 모드 지원:
// - src가 있으면 실제 iframe으로 라이브 웹뷰를 띄움 (ERP URL 확정 후)
// - src가 없고 previewImage만 있으면 정적 스크린샷을 보여줌 (지금 단계, 디자인과 동일)
// - 둘 다 없으면 최소한의 안내 문구만 보여주는 fallback
//
// gw.fingerservice.co.kr 같은 외부 사이트는 PC 전체 화면 기준으로 레이아웃이
// 짜여있어서, iframe 자체를 작게(height=220 같은) 눌러버리면 그 사이트의 CSS가
// 비정상적인 화면 비율로 착각해서 내부 요소 위치가 다 틀어짐(로그인 박스가
// 구석에 몰리는 등). 그래서 iframe은 "실제 크기(nativeWidth x nativeHeight)"
// 그대로 렌더링하고, 그 결과물을 CSS transform: scale()로 통째로 축소해서 보여줌
// → 내부 사이트는 항상 정상 비율의 큰 화면으로 착각한 채 레이아웃을 그림

import { useMemo } from 'react';
import styles from './custom.module.css';

export default function LoginWebviewEmbed({
    src,
    previewImage,
    title = '로그인 화면 예시',
    guideText,
    height = 480,
    // iframe이 "실제로" 렌더링될 기준 크기. 외부 사이트가 설계된 기준 해상도에
    // 맞춰야 레이아웃이 안 깨짐 (PC 웹 기준이라 1280x800을 기본값으로 둠)
    nativeWidth = 1280,
    nativeHeight = 800,
    className = '',
}) {
    // height(보여줄 높이) 대비 nativeHeight(실제 렌더 높이)의 비율을 계산
    // 예: height=220, nativeHeight=800 → scale=0.275 (27.5% 크기로 축소)
    const scale = useMemo(() => height / nativeHeight, [height, nativeHeight]);

    return (
        <div className={`${styles.webviewWrapper} ${className}`}>
            {guideText && <div className={styles.webviewGuide}>{guideText}</div>}

            {src ? (
                // 바깥 박스: 실제로 화면에 차지할 크기(축소된 크기)만큼만 잡고, 넘치는 건 잘라냄
                <div
                    className={styles.webviewScaleOuter}
                    style={{ height, width: nativeWidth * scale }}
                >
                    {/* 안쪽 박스: iframe을 실제 크기(nativeWidth x nativeHeight) 그대로 그린 뒤
                        scale()로 축소. transformOrigin을 top left로 둬야 축소 기준점이
                        박스 왼쪽 위로 고정되어 바깥 박스 크기 계산과 어긋나지 않음 */}
                    <div
                        className={styles.webviewScaleInner}
                        style={{
                            width: nativeWidth,
                            height: nativeHeight,
                            transform: `scale(${scale})`,
                        }}
                    >
                        <iframe
                            src={src}
                            title={title}
                            className={styles.webviewFrame}
                            style={{ width: nativeWidth, height: nativeHeight }}
                        />
                    </div>
                </div>
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

/* ===== 사용 예시 (데모/목업) =====

// 작게 미리보기 (비율 안 깨짐)
<LoginWebviewEmbed
  src="https://gw.fingerservice.co.kr/"
  title="ERP 로그인"
  guideText="아래 화면에서 로그인을 완료해주세요."
  height={220}
/>

// 실제 화면 크기로 (거의 그대로)
<LoginWebviewEmbed src="https://gw.fingerservice.co.kr/" height={800} />

*/