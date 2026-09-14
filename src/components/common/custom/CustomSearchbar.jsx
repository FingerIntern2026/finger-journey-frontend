// CustomSearchbar.jsx의 역할
// 검색어 입력 + 검색 트리거를 담당하는 공통 검색창
// 위키 목록(WIK_LIS_P01), 관리자 입사자 목록(ADM_EMP_P01) 화면에서 공통으로 씀

import styles from './custom.module.css';

export default function CustomSearchbar({
    value,
    onChange,
    onSearch,
    placeholder = '검색',
    className = '',
}) {
    const handleKeyDown = (e) => {
        // 엔터 쳤을 때도 검색 버튼 누른 것과 동일하게 동작해야 해서 keydown을 따로 잡음
        if (e.key === 'Enter') {
            onSearch?.(value);
        }
    };

    return (
        <div className={`${styles.searchbarWrapper} ${className}`}>
            <input
                type="text"
                className={styles.searchbarInput}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                type="button"
                className={styles.searchbarIconBtn}
                onClick={() => onSearch?.(value)}
                aria-label="검색"
            >
                🔍
            </button>
        </div>
    );
}

// 검색 결과 목록에서 검색어와 일치하는 부분만 <mark>로 감싸는 헬퍼.
// 정규식 특수문자(.*+? 등)가 검색어에 섞여 들어오면 정규식이 깨지므로 이스케이프 처리함
export function highlightText(text, keyword) {
    if (!keyword) return text;

    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = String(text).split(regex);

    return parts.map((part, i) =>
        regex.test(part) ? (
            <mark key={i} className={styles.highlight}>{part}</mark>
        ) : (
            part
        )
    );
}