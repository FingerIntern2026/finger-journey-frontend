// AcrosticInputForm.jsx의 역할
// 완주 3행시 입력 화면(PTH_CPL_P01) 전용 폼
//    * "3줄 다 비어있지 않은지"만 체크하 -> 필수 입력 검증이었음.
//    * 이름 글자는 placeholder(안내 문구)로만 쓰이고 강제 검증 대상이 아님

import { useState } from 'react';
import { sendPost } from '../../../api/client';
import styles from './custom.module.css';

// name: 3행시를 만들 기준 이름 (예: "김핑거") — name.length줄만큼 입력칸이 생김
// apiUrl: 저장 요청 보낼 엔드포인트 (백엔드 확정 전이라 기본값은 더미 경로)
// onSuccess: 저장 성공 시 호출 (예: 삼행시2 화면(PTH_CPL_P02)으로 이동)
export default function AcrosticInputForm({
    name = '',
    apiUrl = '/path/acrostic',
    onSuccess,
    className = '',
}) {
    const chars = name.split('');

    const [lines, setLines] = useState(chars.map(() => ''));
    // 에러는 줄마다가 아니라 폼 전체에 하나만 존재함 (디자인 기준)
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (index, value) => {
        setLines((prev) => {
            const next = [...prev];
            next[index] = value;
            return next;
        });
    };

    // "3행 중 하나라도 미입력"인지만 확인. 첫 글자 일치 여부는 검증하지 않음
    const validate = () => {
        const hasEmpty = lines.some((line) => line.trim() === '');
        if (hasEmpty) {
            setError('3행시를 입력해주세요');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setSubmitting(true);
        try {
            await sendPost(apiUrl, { name, lines });
            onSuccess?.(lines);
        } catch (err) {
            // 저장 자체가 실패한 경우(네트워크/서버 에러)는 디자인에 명시된 케이스는
            // 아니지만, 사용자에게 아무 반응이 없으면 안 되니 같은 에러 영역에 표시
            setError('저장에 실패했어요. 잠시 후 다시 시도해주세요.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={`${styles.acrosticForm} ${className}`}>
            {chars.map((char, index) => (
                <div key={index} className={styles.acrosticRow}>
                    <span className={styles.acrosticChar}>{char}</span>
                    <input
                        type="text"
                        className={styles.acrosticInput}
                        value={lines[index]}
                        onChange={(e) => handleChange(index, e.target.value)}
                        placeholder={`'${char}'으로 시작하는 문장을 입력해보세요`}
                    />
                </div>
            ))}

            {/* 줄별 에러가 아니라 폼 전체 하단에 에러 하나만 (디자인 기준) */}
            {error && (
                <p className={styles.acrosticErrorText}>⚠ {error}</p>
            )}

            <button
                type="button"
                className={styles.acrosticSubmitBtn}
                onClick={handleSubmit}
                disabled={submitting}
            >
                {submitting ? '저장 중...' : '저장하기'}
            </button>
        </div>
    );
}

/* ===== 사용 예시 (데모/목업) =====

<AcrosticInputForm
  name="김핑거"
  onSuccess={(lines) => console.log('3행시 저장 완료:', lines)}
/>

*/