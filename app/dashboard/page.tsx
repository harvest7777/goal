"use client";

import HeyMessage from "./_components/hey-message";
import PickGoal from "./_components/pick-goal";
import ReflectionButton from "./_components/reflection-button";
import SelectedGoal from "./_components/selected-goal";
import Timer from "./_components/timer";
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
        <div className="w-1/2 flex flex-col items-center gap-10">
          <SelectedGoal />
          <Timer />
          <ReflectionButton/>
        </div>
      )}
    </div>
  );
}
