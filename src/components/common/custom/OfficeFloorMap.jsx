// OfficeFloorMap.jsx
// 종로/여의도 포레스트 약도 화면이에요.
// 평면도는 마커까지 이미 합성된 완성 이미지를 통째로 받아서 보여주는 방식인데,
// 실제 이미지 나오기 전까지는 회색 박스로 임시 채워둬요.

import styles from './custom.module.css';

const OfficeFloorMap = ({
  officeName,       // 필수. 제목 (예: "종로 포레스트", "여의도 포레스트")
  onBackClick,      // 필수. "뒤로 가기" 버튼 눌렀을 때 실행할 함수
}) => {
  return (
    <div className={styles.officeFloorMap}>
      <h2 className={styles.officeTitle}>{officeName}</h2>

      {/* 임시 자리표시자: 실제 평면도 이미지 나오기 전까지 회색 박스로 대신 채워둠
          나중에 이미지 받으면 이 div를 <img src={...} /> 로 바꾸면 됨 */}
      <div className={styles.officeMapPlaceholder} />

      <button className={styles.introButton} onClick={onBackClick}>
        뒤로 가기
      </button>
    </div>
  );
};

export default OfficeFloorMap;