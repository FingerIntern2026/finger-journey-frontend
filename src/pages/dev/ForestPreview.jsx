import { useState } from "react";
import ForestClear from "../../components/feature/PTH/FOR/ForestClear";
import ForestPage from "../../components/feature/PTH/FOR/ForestPage";

export default function ForestPreview() {
  const [step, setStep] = useState(1);
  const handleBack = () => {
    if (step === 1) return window.location.assign("/pth/map");
    setStep((current) => current - 1);
  };

  if (step === 7) {
    return <ForestClear onBack={() => setStep(6)} onComplete={() => window.location.assign("/pth/map")} />;
  }

  return <ForestPage step={step} onBack={handleBack} onNext={() => setStep((current) => Math.min(7, current + 1))} />;
}
