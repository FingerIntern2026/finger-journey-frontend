/**
 * ContentCarousel (온보딩 콘텐츠 카드)
 *
 * 일러스트+설명문 중심의 온보딩 콘텐츠 화면 8개 세트(핑거이야기/취업규칙/인사규정/
 * 윤리규정/이메일안내/법인카드/포레스트/레벨업, PTH_STR/RUL/HRP/ETH/EML/CRD/FOR/LEV)
 * 가 공유하는 카드 구조 (인터페이스 명세서 4.3.3).
 *
 * 세트별 차이(연도 표시, 단계 아이콘, 하단 참고문구)는 옵션 props로 흡수함:
 * - year: 핑거이야기 세트에서만 사용
 * - steps: 포레스트 세트에서만 사용
 * - footnote: 법인카드 세트에서만 사용
 *
 * ⚠️ 이번 스코프는 컴포넌트 껍데기 + 샘플 데이터 시연까지만.
 *    8개 세트의 실제 콘텐츠(진짜 텍스트/이미지)를 전부 채우는 건 스코프 밖.
 *
 * ※ 스타일은 layout.module.css의 CSS Modules 클래스를 사용함
 */
import styles from './layout.module.css';

const ContentCarousel = ({
  title,
  illustrationSrc,
  description,
  year,
  steps,
  footnote,
  className = '',
}) => {
  return (
    <div className={`${styles.contentCarousel} ${className}`}>
      {year && <span className={styles.contentCarouselYear}>{year}</span>}

      <img
        src={illustrationSrc}
        alt={title}
        className={styles.contentCarouselIllustration}
      />

      <h4 className={styles.contentCarouselTitle}>{title}</h4>
      <p className={styles.contentCarouselDescription}>{description}</p>

      {steps && steps.length > 0 && (
        <div className={styles.contentCarouselSteps}>
          {steps.map((step) => (
            <div key={step.label} className={styles.contentCarouselStep}>
              <span>{step.icon}</span>
              <span>{step.label}</span>
            </div>
          ))}
        </div>
      )}

      {footnote && <p className={styles.contentCarouselFootnote}>{footnote}</p>}
    </div>
  );
};

export default ContentCarousel;
