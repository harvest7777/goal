"use client";

import { useDashboardStore } from "../../stores/useDashboardStore";
import DayProgressPage from "../_components/day-progress-page";
import WeekProgressPage from "../_components/week-progress-page";

export default function GraphicalPage () {
    const view = useDashboardStore((state)=>state.view);
    if (!view) { 
        return null;
    }
    return (
        <div>
            <DayProgressPage display={view}/>
            <WeekProgressPage display={view} />
        </div>
    )
}