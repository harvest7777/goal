"use client";
import Spinner from "@/components/ui/loading-spinner";
import { useGoalStore } from "../../stores/useGoalsStore";
import GoalDisplayMinimal from "../../_components/goal-display-minimal";

type props = {
    className?: string;
}
export default function GoalsList({ className }: props) {
    const goals = useGoalStore((state) => state.goals);
    return (
        <div className={`${className} flex flex-col items-center align-middle justify-center gap-y-4`}>
            {goals ? (
                goals.map((goal) => (
                    <GoalDisplayMinimal className="w-full" key={goal.id} goal={goal} />
                ))
            ) : (
                <Spinner/>
            )}
        </div>

    )
}