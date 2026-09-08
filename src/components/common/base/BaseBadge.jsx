// BaseBadge.jsx의 역할
// 상태를 표시만 하는 읽기 전용 배지. 클릭 이벤트가 없어 <span> 사용 (버튼처럼 <button> 안 씀)

export default function BaseBadge({ label, color = 'gray' }) {
    return (
        <span className={`base-badge base-badge--${color}`}>
      {label}
    </span>
    );
}