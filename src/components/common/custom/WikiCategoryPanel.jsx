// 역할: 카테고리(항목 수 표시) 목록을 보여주고, 클릭하면 펼침/접힘으로 하위
//       항목을 보여주는 패널. 위키 목록(WIK_LIS_P01), 위키 관리 메인 화면에서
//       공통으로 쓸 예정. wikiApi.js가 아직 없어서 서버 통신을 직접 하지 않는
//       순수 프레젠테이션 컴포넌트로 만듦 — categories 데이터를 props로만 받고
//       실제 데이터 로딩(fetch)은 쓰는 쪽 페이지 책임. 아이콘 구조는 Notion API의
//       icon 객체 방식을 따름: { type: 'emoji', emoji: '🗺️' } 또는
//       { type: 'image', url: '...' }
// 사용처: ComponentListPage.jsx(데모)
// 담당자:

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './custom.module.css';

// icon 객체를 type에 따라 다르게 렌더링하는 헬퍼.
// icon이 아예 없는 카테고리도 있을 수 있어서 null 체크부터 함
function CategoryIcon({ icon }) {
    if (!icon) return null;

    if (icon.type === 'emoji') {
        return <span className={styles.wikiCategoryIcon}>{icon.emoji}</span>;
    }

    if (icon.type === 'image') {
        return <img src={icon.url} alt="" className={styles.wikiCategoryIconImg} />;
    }

    // 알 수 없는 type이 내려와도 화면이 깨지지 않도록 아무것도 안 그림
    return null;
}

// categories: [{ id, name, icon: {type, emoji|url}, count, items: [{ id, title }] }]
// onItemClick: (item) => void — 하위 항목 클릭 시 실행 (예: 위키 상세로 이동)
export default function WikiCategoryPanel({ categories = [], onItemClick, className = '' }) {
    // 펼쳐진 카테고리의 id들을 Set으로 관리 — 여러 카테고리가 동시에 펼쳐질 수 있어서
    const [openIds, setOpenIds] = useState(new Set());

    const toggle = (id) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <div className={`${styles.wikiPanel} ${className}`}>
            {categories.map((category) => {
                const isOpen = openIds.has(category.id);

                return (
                    <div key={category.id}>
                        <div
                            className={styles.wikiCategoryHeader}
                            onClick={() => toggle(category.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && toggle(category.id)}
                        >
                            <span className={styles.wikiCategoryTitle}>
                                <CategoryIcon icon={category.icon} />
                                {category.name}
                                <span className={styles.wikiCategoryCount}>
                                    ({category.count ?? category.items?.length ?? 0})
                                </span>
                            </span>
                            <ChevronDown
                                size={18}
                                className={`${styles.wikiChevron} ${isOpen ? styles.wikiChevronOpen : ''}`}
                            />
                        </div>

                        {isOpen && (
                            <div className={styles.wikiItemList}>
                                {category.items && category.items.length > 0 ? (
                                    category.items.map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            className={styles.wikiItem}
                                            onClick={() => onItemClick?.(item)}
                                        >
                                            {item.title}
                                        </button>
                                    ))
                                ) : (
                                    <p className={styles.wikiEmpty}>등록된 항목이 없어요.</p>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}