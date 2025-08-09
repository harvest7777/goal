/**
 * This component renders all the weekly charts for the user's goals.
 * This has to be a client component because we have to rely on the browser time zone for fetching data.
 * @param goalsToDisplay - The user's goals to display charts for.
 */

"use client";

import { useEffect, useState } from "react";
import { getWeeklySessions } from "../api-helpers";
import { RenderWeeklyChart } from "./render-weekly-chart";
import supabase from "@/lib/supabase/supabase";
import Spinner from "@/components/ui/loading-spinner";

interface WeeklyChartProps {
    goalsToDisplay: Goal[];
    className?: string;
}

export default function DisplayWeeklyProgress({ goalsToDisplay: goals, className }: WeeklyChartProps) {
    const [goalToWeekArray, setGoalToWeekArray] = useState<Record<number, number[]> | null>(null);
    const [totalTimeMs, setTotalTimeMs] = useState<number | null>(null);
    const [goalToMs, setGoalToMs] = useState<Record<number, number> | null>(null);

    const weekDayStart = new Date();
    weekDayStart.setDate(weekDayStart.getDate() - weekDayStart.getDay());
    weekDayStart.setHours(0, 0, 0, 0);
    const weekDayEnd= new Date(weekDayStart);
    weekDayEnd.setDate(weekDayEnd.getDate());
    weekDayEnd.setHours(23, 59, 59, 999);

    useEffect(()=>{
        const init = async() => {

            const weeklyGoalSessionPairs = await Promise.all(
                goals.map(async (goal) => {
                    const sessions = await getWeeklySessions(goal.id, weekDayStart.toISOString(), weekDayEnd.toISOString());
                    return [goal.id, sessions];
                })
            );
            const weeklyGoalMap = Object.fromEntries(weeklyGoalSessionPairs);
            setGoalToWeekArray(weeklyGoalMap);

            const weekEnd = new Date(weekDayEnd);
            weekEnd.setDate(weekEnd.getDate() + 6);

            const goalTimePairs = await Promise.all(
                goals.map(async (goal) => {
                    const { data, error } = await supabase.rpc('get_total_time_spent_from_range', {
                        p_goal_id: goal.id,
                        p_start_time: weekDayStart.toISOString(),
                        p_end_time: weekEnd.toISOString()
                    })
                    if (error) {
                        console.error("Error fetching total time spent:", error);
                    }
                    return [goal.id, data]; 
                })
            );
            setGoalToMs(Object.fromEntries(goalTimePairs));
            const { data, error } = await supabase.rpc('get_total_time_spent_from_range', {
                p_start_time: weekDayStart.toISOString(),
                p_end_time: weekEnd.toISOString()
            })
            if (error) {
                console.error("Error fetching total time spent:", error);
                return;
            }
            setTotalTimeMs(data);
        }
        init();
    },[])

    if (!goalToWeekArray || !goalToMs ||totalTimeMs === null) {
        return <Spinner className="mt-10"/>
    }
    return (
        <div className={`${className} flex flex-col justify-center align-middle items-center gap-5`}>
            <h2>{`total time invested this week: ${prettifyMs(totalTimeMs)}`}</h2>
            <div className={`${className} flex gap-5 items-center align-middle justify-center flex-wrap`}>
                {goals.map((goal) => (
                   <RenderWeeklyChart totalMs={goalToMs[goal.id]} weekArray={goalToWeekArray[goal.id]} goal={goal} key={goal.id}/>
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