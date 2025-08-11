/***
 * This page manages different ways of showing the user's progress on their current active goals.
 */
"use client";
import { useState } from "react";
import { useGoalStore } from "../stores/useGoalsStore";
import { ChooseProgressDisplay } from "./_components/choose-display";
import DisplayWeeklyProgress from "./_components/display-weekly-progress";
import DisplayDailyProgress from "./_components/display-daily-progress";
import { ChooseDay } from "./_components/choose-day";

export default function ProgressPage() {
    const goals = useGoalStore((state) => state.goals);
    const [date, setDate] = useState<Date | undefined>(new Date()); 
    const [display, setDisplay] = useState<string>("day");

    if (!goals || !date){
        return null;
    }

    return (
    <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex gap-2 justify-center">
            <ChooseProgressDisplay display={display} setDisplay={setDisplay} /> 
            <ChooseDay date={date} setDate={setDate} />
        </div>
        {display === "day" && 
            <DisplayDailyProgress date={date} className="w-full" goalsToDisplay={goals} />
        }
        {
            display === "week" && 
            <DisplayWeeklyProgress className="w-full" goalsToDisplay={goals}/>
        }
    </div>
    )
}
