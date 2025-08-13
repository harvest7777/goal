/***
 * This page manages different ways of showing the user's progress on their current active goals.
 */
"use client";
import { useState } from "react";
import { ChooseProgressDisplay } from "./_components/choose-display";
import { ChooseDay } from "./_components/choose-day";
import DayProgressPage from "./_components/day-progress-page";
import WeekProgressPage from "./_components/week-progress-page";

export default function ProgressPage() {
    const [date, setDate] = useState<Date | undefined>(new Date()); 
    const [display, setDisplay] = useState<string>("day");

    return (
    <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex gap-2 justify-center">
            <ChooseProgressDisplay display={display} setDisplay={setDisplay} /> 
            <ChooseDay date={date} setDate={setDate} />
        </div>

        <DayProgressPage display={display} date={date} className="w-full" />


        <WeekProgressPage display={display} date={date} className="w-full" />
    </div>
    )
}
