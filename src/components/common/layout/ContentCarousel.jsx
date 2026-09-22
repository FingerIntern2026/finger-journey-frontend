// 역할: 온보딩 콘텐츠 화면 8개 세트(핑거이야기/취업규칙/인사규정/윤리규정/이메일안내/법인카드/
//       포레스트/레벨업)가 공유하는 카드 구조 (인터페이스 명세서 4.3.3). 세트마다 내용이 달라서
//       텍스트로 재현하지 않고 디자이너가 내려주는 이미지 한 장(imageSrc)으로 처리함.
//       ⚠️ 이번 스코프는 컴포넌트 껍데기 + 샘플 이미지 시연까지만 (8개 세트 실제 에셋은 스코프 밖)
// 사용처: ComponentListPage.jsx (컴포넌트 데모)
// 담당자:
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
