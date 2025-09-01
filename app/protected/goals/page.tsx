"use client";

import { Button } from "@/components/ui/button";
import { useGoalStore } from "../stores/useGoalsStore";
import GoalDisplay from "./_components/goal-display";
import CenteredSpinner from "@/components/ui/centered-spinner";
import Link from "next/link";

export default function GoalsPage() {
    const goals = useGoalStore((state) => state.goals);
    if (!goals) {
        return <CenteredSpinner/>
    }
    const focusedGoals = goals.filter((goal) => goal.is_focused);
    const unfocusedGoals = goals.filter((goal) => !goal.is_focused);
    return (
        <div className="flex flex-col items-center justify-center align-middle pb-32">
            <h1>remember why you started in the first place</h1>
            <div className="w-1/2 flex flex-col items-center align-middle gap-4 mt-10">
                <Link className="w-full" href="/protected/manage-goals">
                    <Button className="w-full">new commitment</Button>
                </Link>
                {focusedGoals.map((goal) => (
                    <GoalDisplay key={goal.id} goal={goal} className='w-full' />
                ))}

                {unfocusedGoals.map((goal) => (
                    <GoalDisplay key={goal.id} goal={goal} className='w-full' />
                ))}
            </div>
        </div>
    )
}