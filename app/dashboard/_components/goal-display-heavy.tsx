"use client";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useGoalStore } from "../stores/useGoalsStore";

type Props = {
  goal: Goal;
  className?: string;
};


export default function GoalDisplayHeavy({ goal, className }: Props) {
  const [open, setOpen] = useState(false);
  const setSelectedGoal = useGoalStore((state) => state.setSelectedGoal);
  const handleSelect = () => {
    console.log("hi")
    setSelectedGoal(goal);
  }
  return (
    <div
      className={`${className} rounded-sm outline outline-1 h-min outline-foreground p-2 relative cursor-pointer hover:outline-2 `}
      onClick={(()=> handleSelect())}
    >
      {/* header */}
      <div
        className="flex justify-between items-center"
      >
        <h2 className="line-clamp-1">{goal.name}</h2>
        <FiChevronDown
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className={`transition-transform duration-300 cursor-pointer ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* dropdown content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-40 mt-2" : "max-h-0"
        }`}
      >
        <p className="text-sm">{goal.motivator}</p>
      </div>
    </div>
  );
}
