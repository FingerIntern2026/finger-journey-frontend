import { useState } from "react";
import FingerStoryClear from "../../components/feature/PTH/STR/FingerStoryClear";
import FingerStoryPage from "../../components/feature/PTH/STR/FingerStoryPage";

export default function FingerStoryPreview() {
  const [step, setStep] = useState(1);

  const handleBack = () => {
    if (step === 1) {
      window.location.assign("/pth/map");
      return;
    }

    setStep((current) => current - 1);
  };

  if (step === 7) {
    return (
      <FingerStoryClear
        onBack={() => setStep(6)}
        onComplete={() => window.location.assign("/pth/map")}
      />
    );
  }

  return (
    <FingerStoryPage
      step={step}
      onBack={handleBack}
      onNext={() => setStep((current) => Math.min(7, current + 1))}
    />
  );
}
