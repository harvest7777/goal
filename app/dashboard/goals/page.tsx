"use client";

import Spinner from "@/components/ui/loading-spinner";
import { useGoalStore } from "../stores/useGoalsStore";
import GoalDisplay from "./goal-display";

export default function GoalsPage() {
    const goals = useGoalStore((state) => state.goals);
    return (
        <div className="flex flex-col items-center justify-center align-middle">
            <h1>remember why you started in the first place</h1>
            <div className="w-1/2 flex flex-col items-center align-middle gap-4 mt-10">
            {goals? (
                goals.map((goal) => (
                    <GoalDisplay key={goal.id} goal={goal} className='w-full' />
                ))

            ):(
                <Spinner/>
            )}
            </div>
        </div>
    )
}