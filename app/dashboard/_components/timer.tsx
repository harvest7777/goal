"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createSession } from "../api-helpers";
import { useGoalStore } from "../stores/useGoalsStore";

let originalTitle: string | undefined;

type props = {
  className?: string;
};
export default function Timer({ className }: props) {
  const [elapsed, setElapsed] = useState(0);
  const [lastStart, setLastStart] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const selectedGoal = useGoalStore((state) => state.selectedGoal);

  useEffect(() => {
    if (!originalTitle) {
      originalTitle = document.title; // Store original title only once
    }
    if (!active) {
      document.title = originalTitle; // Reset title when timer is not started
      return;
    }
    
    const worker = new Worker(new URL("./timer-worker.js", import.meta.url));

    const startTime = Date.now() - elapsed * 1000; // take into account the elapsed time when resuming
    setLastStart(Date.now());
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;

  const handleClick = async () => {
    if (active) {
      // Pause and log
      if (!selectedGoal) {
        console.error("No goal selected");
        return;
      }
      const startString = new Date(lastStart).toISOString();
      const endString = new Date(Date.now()).toISOString();
      const newSession = await createSession(
         selectedGoal.id,
         startString,
         endString,
      );
      console.log("New session created:", newSession);
      setActive(false);
    } else {
      setActive(true);
    }
  };


  return (
    <div
      className={`${className} flex flex-col items-center justify-center text-2xl`}
    >
      {hours}h {minutes}m {seconds}s
      <div className="flex gap-2 mt-2">
        <Button onClick={handleClick}>
          {active ? "pause" : elapsed > 0 ? "resume" : "start"}
        </Button>
        <Button onClick={()=>{setElapsed(0); setActive(false);}}>
          reset
        </Button>
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
