import { useState } from "react";
import EthicsRuleClear from "../../components/feature/PTH/RTH/EthicsRuleClear";
import EthicsRulePage from "../../components/feature/PTH/RTH/EthicsRulePage";

export default function EthicsRulePreview() {
  const [step, setStep] = useState(1);

  const handleBack = () => {
    if (step === 1) {
      window.location.assign("/pth/map");
      return;
    }
    setStep((current) => current - 1);
  };

  if (step === 5) {
    return (
      <EthicsRuleClear
        onBack={() => setStep(4)}
        onComplete={() => window.location.assign("/pth/map")}
      />
    );
  }

  return (
    <EthicsRulePage
      step={step}
      onBack={handleBack}
      onNext={() => setStep((current) => Math.min(5, current + 1))}
    />
  );
}
