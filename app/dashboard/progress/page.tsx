"use client";
import { useEffect, useState } from "react"
import { getDayArray } from "./_components/graph-helpers"
import { getSessions } from "./api-helpers"
import { Chart } from "./_components/daily-chart"
import { useGoalStore } from "../stores/useGoalsStore";
export default function ProgressPage() {
    const [goalToDayArray, setGoalToDayArray] = useState<Record<number, number[]>>({});
    const goals = useGoalStore((state) => state.goals);

    // TODO cache these calls somehow because this is not performant lol
    useEffect(() => {
        if (!goals) {
            return;
        }
        const init = async () => {
            const startDate = new Date();
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date();
            endDate.setHours(23, 59, 59, 999);

            const goalSessionPairs = await Promise.all(
            goals.map(async (goal) => {
                const sessions = await getSessions(goal.id, startDate.toISOString(), endDate.toISOString());
                const dayArray = getDayArray(sessions);
                return [goal.id, dayArray]; 
            })
            );

            const goalMap = Object.fromEntries(goalSessionPairs);
            setGoalToDayArray(goalMap);
        };

        init();
    }, [goals]);

    if (!goals){
        return null;
    }
    return (
    <div className="flex flex-col items-center justify-center gap-5">
        <h1>lets see how we are doing</h1>
        <h2>today</h2>
        <div className="flex flex-wrap gap-5 justify-center">
            {goals.map((goal) => (
                goal.daily_commitment && <Chart dayArray={goalToDayArray[goal.id]} goal={goal} key={goal.id}/>
            ))}
        </div>
    </div>
    )
}