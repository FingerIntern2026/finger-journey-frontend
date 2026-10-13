import { useState } from "react";
import EmploymentRuleClear from "../../components/feature/PTH/RUL/EmploymentRuleClear";
import EmploymentRulePage from "../../components/feature/PTH/RUL/EmploymentRulePage";

export default function EmploymentRulePreview() {
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
      <EmploymentRuleClear
        onBack={() => setStep(6)}
        onComplete={() => window.location.assign("/pth/map")}
      />
    );
  }

  return (
    <EmploymentRulePage
      step={step}
      onBack={handleBack}
      onNext={() => setStep((current) => Math.min(7, current + 1))}
    />
  );
}
