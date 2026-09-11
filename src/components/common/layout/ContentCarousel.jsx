/**
 * ContentCarousel (온보딩 콘텐츠 카드)
 *
 * 온보딩 콘텐츠 화면 8개 세트(핑거이야기/취업규칙/인사규정/윤리규정/이메일안내/
 * 법인카드/포레스트/레벨업, PTH_STR/RUL/HRP/ETH/EML/CRD/FOR/LEV)가 공유하는
 * 카드 구조 (인터페이스 명세서 4.3.3).
 *
 * 세트마다 내용(연도/일러스트/타이틀/설명/단계/참고문구)이 다 달라서 텍스트로
 * 재현하지 않고, 디자이너가 세트별로 통째로 내려주는 이미지 한 장(imageSrc)으로
 * 처리함.
 *
 * ⚠️ 이번 스코프는 컴포넌트 껍데기 + 샘플 이미지 시연까지만.
 *    8개 세트의 실제 이미지 에셋을 전부 채우는 건 스코프 밖.
 *
 * ※ 스타일은 layout.module.css의 CSS Modules 클래스를 사용함
 */
import styles from './layout.module.css';

const ContentCarousel = ({ imageSrc, imageAlt = '', className = '' }) => {
  return (
    <div className={`${styles.contentCarousel} ${className}`}>
      <img
        src={imageSrc}
        alt={imageAlt}
        className={styles.contentCarouselImage}
      />
    </div>
  );
};

export default ContentCarousel;
