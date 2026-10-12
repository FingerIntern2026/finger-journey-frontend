import { useState } from "react";
import CorporateCardClear from "../../components/feature/PTH/CRD/CorporateCardClear";
import CorporateCardPage from "../../components/feature/PTH/CRD/CorporateCardPage";

export default function CorporateCardPreview() {
  const [step, setStep] = useState(1);

  const handleBack = () => {
    if (step === 1) {
      window.location.assign("/pth/map");
      return;
    }
    setStep((current) => current - 1);
  };

  if (step === 8) {
    return (
      <CorporateCardClear
        onBack={() => setStep(7)}
        onComplete={() => window.location.assign("/pth/map")}
      />
    );
  }

  return (
    <CorporateCardPage
      step={step}
      onBack={handleBack}
      onNext={() => setStep((current) => Math.min(8, current + 1))}
    />
  );
}
