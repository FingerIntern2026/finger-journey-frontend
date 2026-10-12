import { useState } from "react";
import FingerStoryClear from "../../components/feature/PTH/STR/FingerStoryClear";
import FingerStoryPage from "../../components/feature/PTH/STR/FingerStoryPage";
import PTH_MAP_P01 from "../pth/PTH_MAP_P01";

export default function FingerStoryPreview() {
  const [step, setStep] = useState(1);

  if (step === 0) return <PTH_MAP_P01 preview />;

  if (step === 7) {
    return (
      <FingerStoryClear
        onBack={() => setStep(6)}
        onComplete={() => setStep(0)}
      />
    );
  }

  return (
    <FingerStoryPage
      step={step}
      onBack={() => setStep((current) => Math.max(0, current - 1))}
      onNext={() => setStep((current) => Math.min(7, current + 1))}
    />
  );
}
