import { useState } from "react";
import EmailGuideClear from "../../components/feature/PTH/EML/EmailGuideClear";
import EmailGuidePage from "../../components/feature/PTH/EML/EmailGuidePage";

export default function EmailGuidePreview() {
  const [isClear, setIsClear] = useState(false);

  if (isClear) {
    return (
      <EmailGuideClear
        onBack={() => setIsClear(false)}
        onComplete={() => window.location.assign("/pth/map")}
      />
    );
  }

  return (
    <EmailGuidePage
      onBack={() => window.location.assign("/pth/map")}
      onNext={() => setIsClear(true)}
    />
  );
}
