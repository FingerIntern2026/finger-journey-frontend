// http://localhost:5173/pth/map

import PathMap from "../../components/feature/PTH/MAP/PathMap";
import useNavigationStore from "../../stores/useNavigationStore";

export default function PTH_MAP_P01() {
  const goForward = useNavigationStore((state) => state.goForward);
  const initialQuizCode = useNavigationStore((state) => state.nowPageParams.params.quizCode);

  return <PathMap onSelectItem={goForward} initialQuizCode={initialQuizCode} />;
}
