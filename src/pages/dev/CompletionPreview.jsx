import { useState } from "react";
import CompletionInput from "../../components/feature/PTH/CPL/CompletionInput";
import CompletionSaved from "../../components/feature/PTH/CPL/CompletionSaved";
import { COMPLETION_MOCK_LINES, COMPLETION_MOCK_NAME, COMPLETION_MOCK_REPORT, createMockPoemLines } from "../../components/feature/PTH/CPL/completionMockData";
import CompletionReport from "../../components/feature/PTH/CPL/CompletionReport";

export default function CompletionPreview() {
  const [step, setStep] = useState(1);
  const [lines, setLines] = useState(COMPLETION_MOCK_LINES);
  const name = COMPLETION_MOCK_NAME;
  const backToMap = () => window.location.assign("/pth/map");

  if (step === 1) {
    return <CompletionInput name={name} preview onBack={backToMap} onSuccess={(nextLines) => { setLines(nextLines); setStep(2); }} />;
  }
  if (step === 2) {
    return <CompletionSaved name={name} lines={lines} onBack={() => setStep(1)} onNext={() => setStep(3)} />;
  }
  return (
    <CompletionReport
      report={COMPLETION_MOCK_REPORT}
      poemLines={createMockPoemLines(lines)}
      onBack={() => setStep(2)}
      onWikiClick={() => window.alert("핑거 위키 화면 연결 예정")}
    />
  );
}
