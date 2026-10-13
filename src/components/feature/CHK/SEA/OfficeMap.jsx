import BaseButton from '../../../common/base/BaseButton';
import CheckinArtwork from '../common/CheckinArtwork';
import CheckinHeader from '../common/CheckinHeader';
import styles from './SeatGuide.module.css';

export default function OfficeMap({ title, image, imageTitle, viewBox, width, height, wide = false, onBack }) {
  return (
    <main className={styles.page}>
      <CheckinHeader progress={94} onBack={onBack} className={styles.mapHeader} />
      <section className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <CheckinArtwork
          className={`${styles.mapImage} ${wide ? styles.wideMapImage : ''}`}
          src={image}
          title={imageTitle}
          viewBox={viewBox}
          width={width}
          height={height}
        />
      </section>
      <BaseButton className={styles.nextButton} onClick={onBack}>뒤로 가기</BaseButton>
    </main>
  );
}
