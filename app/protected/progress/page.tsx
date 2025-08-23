/***
 * This page manages different ways of showing the user's progress on their current active goals.
 */
"use client";
import { useSearchParams } from "next/navigation";
import WeekProgressPage from "./_components/week-progress-page";
import DayProgressPage from "./_components/day-progress-page";

export default function ProgressPage() {
    const searchParams = useSearchParams();
    const view = searchParams.get("view") || "day";
    const date = new Date(searchParams.get("date") || "");

    return (
    <div>
        <DayProgressPage display={view} date={date}/>
        <WeekProgressPage display={view} date={date}/>
    </div>
    )
}
