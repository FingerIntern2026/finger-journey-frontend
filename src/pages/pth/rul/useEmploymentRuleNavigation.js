import useNavigationStore from "../../../stores/useNavigationStore";

export default function useEmploymentRuleNavigation(nextScreenCode) {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);

  const handleBack = () => {
    if (!goBack()) goForward("PTH_MAP_P01");
  };

  const handleNext = () => {
    goForward(nextScreenCode);
  };

  return { handleBack, handleNext };
}
