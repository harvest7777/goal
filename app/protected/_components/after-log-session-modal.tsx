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
  const stepToForm: Record<number, JSX.Element> = {
    1: <OutputForm sessionId={sessionId} doAfterSubmit={() => setStep((prev) => prev+1)} />,
    2: <ReflectionForm sessionId={sessionId} doAfterSubmit={() => setStep((prev) => prev+1)} />,
  }
  useEffect(() => {
    if (step > Object.keys(stepToForm).length) {
      setOpen(false);
      setStep(1);
    }
  }, [step]);

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="">
          <DialogTitle>post session thoughts</DialogTitle>
          {stepToForm[step]}
        </DialogContent>
      </Dialog>
    )
}