import {
  Dialog,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import OutputForm from "./output-form";
import { JSX, useEffect, useState } from "react";
import ReflectionForm from "./reflection-form";

interface OutputModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    sessionId: number;
}

export default function AfterLogSessionModal({ open, setOpen, sessionId }: OutputModalProps) {
  const [step, setStep] = useState(1);
  const stepToForm: Record<number, { title: string; content: JSX.Element }> = {
    1: { title: "output", content: <OutputForm sessionId={sessionId} nextStep={() => setStep((prev) => prev+1)} /> },
    2: { title: "reflection", content: <ReflectionForm sessionId={sessionId} nextStep={() => setStep((prev) => prev+1)} /> },
  }
  useEffect(() => {
    if (step > Object.keys(stepToForm).length) {
      setOpen(false);
      setStep(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="">
          <DialogTitle>{stepToForm[step]?.title}</DialogTitle>
          {stepToForm[step]?.content}
        </DialogContent>
      </Dialog>
    )
}