// DemoIndexPage.jsx의 역할
// 데모 전체의 첫 화면(허브). 버튼 4개로 각각 다른 프레임워크 패턴을 보여주는
// 하위 페이지로 이동시킴 (화면이동/컴포넌트리스트/다이얼로그예제/API통신)

import PageLayout from '../../components/common/layout/PageLayout.jsx';
import Header from '../../components/common/layout/Header.jsx';
import BaseButton from '../../components/common/base/BaseButton';
import useNavigation from '../../hooks/useNavigation';

const DemoIndexPage = () => {
  const { goTo } = useNavigation();

  return (
    <PageLayout header={<Header label="핑거저니 프레임워크 데모" />}>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <BaseButton label="① 화면이동" onClick={() => goTo('/demo/move')} />
        <BaseButton label="② 컴포넌트리스트" onClick={() => goTo('/demo/components')} />
        <BaseButton label="③ 다이얼로그예제" onClick={() => goTo('/demo/dialog')} />
        <BaseButton label="④ API통신" onClick={() => goTo('/demo/api')} />
      </div>
    </PageLayout>
  );
};

export default DemoIndexPage;
