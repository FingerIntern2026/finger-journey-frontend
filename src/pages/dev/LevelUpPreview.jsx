import { useState } from "react";
import LevelUpClear from "../../components/feature/PTH/LEV/LevelUpClear";
import LevelUpPage from "../../components/feature/PTH/LEV/LevelUpPage";

export default function LevelUpPreview() {
  const [step, setStep] = useState(1);
  const handleBack = () => {
    if (step === 1) return window.location.assign("/pth/map");
    setStep((current) => current - 1);
  };

  if (step === 6) {
    return <LevelUpClear onBack={() => setStep(5)} onComplete={() => window.location.assign("/pth/map")} />;
  }

  return <LevelUpPage step={step} onBack={handleBack} onNext={() => setStep((current) => Math.min(6, current + 1))} />;
}
