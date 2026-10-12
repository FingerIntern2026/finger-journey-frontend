import { useState } from "react";
import HrPolicyClear from "../../components/feature/PTH/HRP/HrPolicyClear";
import HrPolicyPage from "../../components/feature/PTH/HRP/HrPolicyPage";

export default function HrPolicyPreview() {
  const [step, setStep] = useState(1);

  const handleBack = () => {
    if (step === 1) {
      window.location.assign("/pth/map");
      return;
    }

    setStep((current) => current - 1);
  };

  if (step === 4) {
    return (
      <HrPolicyClear
        onBack={() => setStep(3)}
        onComplete={() => window.location.assign("/pth/map")}
      />
    );
  }

  return (
    <HrPolicyPage
      step={step}
      onBack={handleBack}
      onNext={() => setStep((current) => Math.min(4, current + 1))}
    />
  );
}
