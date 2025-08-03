"use client";

import HeyMessage from "./_components/hey-message";
import PickGoal from "./_components/pick-goal";
import SelectedGoal from "./_components/selected-goal";
import Timer from "./_components/timer";
import DialogTest from "./_components/dialog-test";
import { useGoalStore } from "./stores/useGoalsStore";
export default function App() {
  const { selectedGoal } = useGoalStore((state) => state);
  return (
    <div className="flex flex-col items-center min-h-screen">
      {!selectedGoal && (
        <div className="w-1/2 mt-20">
          <HeyMessage className="" />
          <PickGoal className="mt-5" />
        </div>
      )}
      {selectedGoal && (
        <div className="w-1/2">
          <SelectedGoal />
          <Timer className="mt-5" />
        </div>
      )}
      <DialogTest />
    </div>
  );
}
