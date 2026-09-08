/**
 * DemoIndex (컴포넌트 데모 페이지)
 *
 * 파트B에서 만든 공통 컴포넌트(PageLayout, Header, BaseInput, BaseSelect,
 * BaseTextArea)가 실제로 잘 작동하는지 한 화면에 모아서 눈으로 확인하는 용도.
 * 실제 서비스 화면이 아니라 개발/테스트용 페이지.
 */
import { useState } from 'react';
import PageLayout from '../components/common/layout/PageLayout';
import BaseInput from '../components/common/base/BaseInput';
import BaseSelect from '../components/common/base/BaseSelect';
import BaseTextArea from '../components/common/base/BaseTextArea';

const DemoIndex = () => {
  // 각 컴포넌트에 입력한 값을 저장할 상태들.
  // 실제 화면에서는 이 값들을 서버로 보내거나 다음 화면으로 넘기게 될 예정.
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [wikiContent, setWikiContent] = useState('');

  // BaseSelect에 넣을 옵션 목록. { value, label } 형태로 맞춰야 함 (확정된 규칙)
  const departmentOptions = [
    { value: 'common-tech', label: 'Common Tech Part' },
    { value: 'platform', label: 'Platform Part' },
  ];

  return (
    // 데모 페이지는 오솔길/체크인 화면이 아니니까 label은 그냥 "컴포넌트 데모"로 임시 지정
    <PageLayout label="컴포넌트 데모" onBack={() => window.history.back()}>
      <div className="p-4 flex flex-col gap-6">

        {/* BaseInput 테스트: 한 줄 텍스트 입력 */}
        <BaseInput
          label="이름"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="text-sm text-gray-500">입력된 값: {name}</p>

        {/* BaseSelect 테스트: 드롭다운 선택 */}
        <BaseSelect
          label="부서"
          options={departmentOptions}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <p className="text-sm text-gray-500">선택된 값: {department}</p>

        {/* BaseTextArea 테스트: 여러 줄 입력 (기본 rows=6) */}
        <BaseTextArea
          label="위키 상세내용"
          placeholder="내용을 입력하세요"
          value={wikiContent}
          onChange={(e) => setWikiContent(e.target.value)}
        />
        <p className="text-sm text-gray-500">글자 수: {wikiContent.length}자</p>

      </div>
    </PageLayout>
  );
};

export default DemoIndex;