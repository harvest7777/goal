"use client";
import { useEffect, useState } from "react"
import { getDayArray } from "./_components/graph-helpers"
import { getSessions, getWeeklySessions } from "./api-helpers"
import { Chart } from "./_components/daily-chart"
import { useGoalStore } from "../stores/useGoalsStore";
import { WeeklyChart } from "./_components/weekly-chart";
import supabase from "@/lib/supabase/supabase";

export default function ProgressPage() {
    const [goalToDayArray, setGoalToDayArray] = useState<Record<number, number[]>>({});
    const [goalToWeekArray, setGoalToWeekArray] = useState<Record<number, number[]>>({});
    const [dailyMs, setDailyMs] = useState<number | null>(null);
    const goals = useGoalStore((state) => state.goals);

    // TODO cache these calls somehow because this is not performant lol
    useEffect(() => {
        if (!goals) {
            return;
        }
        const init = async () => {
            // SET DAILY MS
            const startDate = new Date();
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date();
            endDate.setHours(23, 59, 59, 999);

            const { data, error } = await supabase.rpc('get_total_time_spent_from_range', {
                p_start_time: startDate,
                p_end_time: endDate
            })
            if (error) {
                console.error("Error fetching daily time:", error);
                return;
            }
            setDailyMs(data);

            // FOR THE DAILY GRAPH
            const goalSessionPairs = await Promise.all(
                goals.map(async (goal) => {
                    const sessions = await getSessions(goal.id, startDate.toISOString(), endDate.toISOString());
                    const dayArray = getDayArray(sessions);
                    return [goal.id, dayArray]; 
                })
            );

            const goalMap = Object.fromEntries(goalSessionPairs);
            setGoalToDayArray(goalMap);
            

            // FOR THE WEEKLY GRAPH
            const weekDayStart = new Date();
            weekDayStart.setDate(weekDayStart.getDate() - weekDayStart.getDay());
            weekDayStart.setHours(0, 0, 0, 0);
            const weekDayEnd= new Date(weekDayStart);
            weekDayEnd.setDate(weekDayEnd.getDate());
            weekDayEnd.setHours(23, 59, 59, 999);

            const weeklyGoalSessionPairs = await Promise.all(
                goals.map(async (goal) => {
                    const sessions = await getWeeklySessions(goal.id, weekDayStart.toISOString(), weekDayEnd.toISOString());
                    return [goal.id, sessions];
                })
            );
            const weeklyGoalMap = Object.fromEntries(weeklyGoalSessionPairs);
            setGoalToWeekArray(weeklyGoalMap);

        };

        init();
    }, [goals]);

    if (!goals){
        return null;
    }
    return (
    <div className="flex flex-col items-center justify-center gap-5">
        <h1>lets see how we are doing</h1>
        <h2 className="flex gap-2"><span>today</span><span>{prettifyMs(dailyMs)}</span></h2>
        <div className="flex flex-wrap gap-5 justify-center">
            {goals.filter((goal)=> goal.is_focused).map((goal) => (
                goal.daily_commitment && <Chart dayArray={goalToDayArray[goal.id]} goal={goal} key={goal.id}/>
            ))}
        </div>

        <h2>this week</h2>
        <div className="flex flex-wrap gap-5 justify-center">
            {goals.filter((goal)=> goal.is_focused).map((goal) => (
                goal.weekly_commitment && <WeeklyChart weekArray={goalToWeekArray[goal.id]} goal={goal} key={goal.id}/>
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