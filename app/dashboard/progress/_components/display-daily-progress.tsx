/**
 * This component renders all the daily charts for the user's goals.
 * This has to be a client component because we have to rely on the browser time zone for fetching data.
 * @param goalsToDisplay - The user's goals to display charts for.
 */

"use client";

import { useEffect, useState } from "react";
import { DailyChartRender } from "./daily-chart-render";
import { getSessions } from "../api-helpers";
import { getDayArray } from "./graph-helpers";
import supabase from "@/lib/supabase/supabase";

interface DailyChartProps {
    goalsToDisplay: Goal[];
    className?: string;
}

export default function DisplayDailyProgress({ goalsToDisplay: goals, className }: DailyChartProps) {
    const [goalToDayArray, setGoalToDayArray] = useState<Record<number, number[]> | null>(null);
    const [totalTimeMs, setTotalTimeMs] = useState<number | null>(null);

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    useEffect(()=>{
        const init = async() => {
            const goalSessionPairs = await Promise.all(
                goals.map(async (goal) => {
                    const sessions = await getSessions(goal.id, startDate.toISOString(), endDate.toISOString());
                    const dayArray = getDayArray(sessions);
                    return [goal.id, dayArray]; 
                })
            );
            const { data, error } = await supabase.rpc('get_total_time_spent_from_range', {
                p_start_time: startDate.toISOString(),
                p_end_time: endDate.toISOString()
            })

            if (error) {
                console.error("Error fetching total time spent:", error);
                return;
            }
            setTotalTimeMs(data);
            const goalMap = Object.fromEntries(goalSessionPairs);
            setGoalToDayArray(goalMap);
        }
        init();
    },[])

    if (!goalToDayArray) {
        return null;
    }
    return (
        <div className={`${className} flex flex-col justify-center align-middle items-center gap-5`}>
            <h2>{`total time invested today: ${prettifyMs(totalTimeMs)}`}</h2>
            <div className={`flex gap-5 items-center align-middle justify-center flex-wrap`}>
                {goals.map((goal) => (
                    goal.daily_commitment && <DailyChartRender dayArray={goalToDayArray[goal.id]} goal={goal} key={goal.id}/>
                ))}
            </div>
        </div>
    )
}

const prettifyMs = (ms: number | null) => {
    if (ms === null) return "N/A";
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
};