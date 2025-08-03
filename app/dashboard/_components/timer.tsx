"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

let originalTitle: string | undefined;

type props = {
  className?: string;
};
export default function Timer({ className }: props) {
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!originalTitle) {
      originalTitle = document.title; // Store original title only once
    }
    if (!started) {
      document.title = originalTitle; // Reset title when timer is not started
      return;
    }
    const worker = new Worker(new URL("./timer-worker.js", import.meta.url));

    const startTime = Date.now() - elapsed * 1000; // take into account the elapsed time when resuming
    worker.postMessage({ startTime });

    worker.onmessage = (e) => {
      const { elapsed } = e.data;

      // Always update tab title
      document.title = formatTime(elapsed);

      // Update UI only when tab is visible
      // this should help prevent browser throttling and unnecessary re renders
      if (document.visibilityState === "visible") {
        setElapsed(elapsed);
      }
    };

    return () => worker.terminate();
  }, [started, elapsed]);

  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;

  const handleClick = async () => {
    if (!started) {
      // If timer is not started, we need to create a new session
      setStarted(true);
    } else {
      setStarted(false);
      // Prompt the user to reflect on their session
      setOpen(true);
    }
  };
  return (
    <div
      className={`${className} flex flex-col items-center justify-center text-2xl`}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[9999]">
          <DialogTitle>Session Reflection</DialogTitle>
          <p>This is a manually triggered modal!</p>
          <DialogClose asChild>
            <button>Close</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      {hours}h {minutes}m {seconds}s
      <div className="flex gap-2 mt-2">
        <Button onClick={handleClick}>
          {started ? "pause" : elapsed > 0 ? "resume" : "start"}
        </Button>
        <Button onClick={() => setElapsed(0)}>reset</Button>
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
}
