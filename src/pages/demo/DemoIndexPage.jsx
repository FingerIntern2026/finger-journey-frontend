// 페이지명: DemoIndexPage (TODO: 정식 화면명 확정되면 교체)
// 역할: 데모 전체의 첫 화면(허브). 버튼 5개로 각각 다른 프레임워크 패턴을 보여주는
//       하위 페이지(화면이동/컴포넌트리스트/다이얼로그예제/API통신/완주 여정)로 이동시킴
// 사용처: 앱 진입("/")이 ROUTE_PATHS.DEMO_HOME으로 리다이렉트되어 가장 먼저 보이는 화면
//         (AppRoutes.jsx에 등록됨)
// url: /demo
// 담당자:

import PageLayout from '../../components/common/layout/PageLayout.jsx';
import Header from '../../components/common/layout/Header.jsx';
import BaseButton from '../../components/common/base/BaseButton';
import useNavigation from '../../hooks/useNavigation';
import { ROUTE_PATHS } from '../../config/routeConfig';

const DemoIndexPage = () => {
  const { goTo } = useNavigation();

  return (
    <PageLayout header={<Header label="핑거저니 프레임워크 데모" />}>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <BaseButton label="① 화면이동" onClick={() => goTo(ROUTE_PATHS.DEMO_MOVE)} />
        <BaseButton label="② 컴포넌트리스트" onClick={() => goTo(ROUTE_PATHS.DEMO_COMPONENTS)} />
        <BaseButton label="③ 다이얼로그예제" onClick={() => goTo(ROUTE_PATHS.DEMO_DIALOG)} />
        <BaseButton label="④ API통신" onClick={() => goTo(ROUTE_PATHS.DEMO_API)} />
        <BaseButton label="⑤ 완주 여정 데모 (퀴즈→3행시→리포트)" onClick={() => goTo(ROUTE_PATHS.DEMO_REPORT)} />
      </div>
    </PageLayout>
  );
};

export default DemoIndexPage;
