// CustomImageUploader.jsx
// 위키 항목 등록/수정 화면에서 쓰는 이미지 업로더예요.
// 최대 3장까지 업로드 가능하고, 각 이미지마다 삭제 버튼이 있어요.
// 3장 다 차면 "+" 버튼이 사라져요.

import styles from './custom.module.css';

const MAX_IMAGES = 3;

const CustomImageUploader = ({
  images,           // 필수. [{ id, url }] 형태의 배열. 현재 업로드된 이미지들
  onAddImage,       // 필수. "+" 버튼 눌렀을 때(파일 선택) 실행할 함수
  onRemoveImage,    // 필수. 개별 이미지 삭제 버튼 눌렀을 때 실행할 함수. (imageId)를 인자로 넘겨줌
}) => {
  // 지금 몇 장 있는지 세서, 꽉 찼는지 판단
  const isFull = images.length >= MAX_IMAGES;

  return (
    <div className={styles.imageUploaderRow}>
      {/* 업로드된 이미지들 - 배열 길이만큼 자동으로 그려짐 */}
      {images.map((image) => (
        <div key={image.id} className={styles.imageSlot}>
          <img src={image.url} alt="" className={styles.imagePreview} />
          <button
            className={styles.imageRemoveButton}
            onClick={() => onRemoveImage(image.id)}
          >
            ✕
          </button>
        </div>
      ))}

      {/* "+" 버튼 - 꽉 차면(isFull이 true면) 안 그려짐 */}
      {!isFull && (
        <button className={styles.imageAddButton} onClick={onAddImage}>
          +
        </button>
      )}
    </div>
  );
};

export default CustomImageUploader;
