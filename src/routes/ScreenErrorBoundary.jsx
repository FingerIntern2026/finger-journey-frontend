// 역할: filePath 기반 동적 import와 화면 렌더링 중 발생한 오류를 잡아 공통 복구 화면을 표시한다.
// 사용처: AppRoutes.jsx
// 담당자: 지연

import { Component } from 'react';
import RouteErrorPage from './RouteErrorPage';

export default class ScreenErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('화면 렌더링 중 오류가 발생했습니다.', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <RouteErrorPage
          title="화면을 불러오지 못했습니다."
          message="화면 파일을 불러오는 중 문제가 발생했습니다. 다시 시도하거나 홈으로 이동해주세요."
          homePath={this.props.homePath}
          showRetry
        />
      );
    }

    return this.props.children;
  }
}
