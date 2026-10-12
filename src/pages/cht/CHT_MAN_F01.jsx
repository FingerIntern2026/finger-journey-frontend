import ChatPanel from "../../components/common/layout/ChatPanel";
import useNavigationStore from "../../stores/useNavigationStore";

export default function CHT_MAN_F01({ preview = false }) {
  const goBack = useNavigationStore((state) => state.goBack);

  return <ChatPanel embedded onClose={() => !preview && goBack()} />;
}
