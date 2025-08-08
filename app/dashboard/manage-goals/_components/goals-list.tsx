"use client";
import Spinner from "@/components/ui/loading-spinner";
import { useGoalStore } from "../../stores/useGoalsStore";
import GoalDisplayMinimal from "../../_components/goal-display-minimal";
import { LuEyeClosed, LuEye } from "react-icons/lu";
import supabase from "@/lib/supabase/supabase";
import { Button } from "@/components/ui/button";

type props = {
    className?: string;
}
export default function GoalsList({ className }: props) {
    const goals = useGoalStore((state) => state.goals);
    const updateGoal = useGoalStore((state) => state.updateGoal);

    const updateGoalFocusStatus = async (goalId: number, isFocused: boolean) => {
        const { data, error } = await supabase
            .from('goals')
            .update({ is_focused: isFocused })
            .eq('id', goalId)
            .select("*")
            .single();

        if (error) {
            console.error("Error updating goal focus status:", error);
            return;
        }
        if (data) {
            console.log(data)
            updateGoal(data);
        }
    }

    return (
        <div className={`${className} flex flex-col items-center align-middle justify-center gap-y-4`}>
            {goals ? (
                goals.map((goal) => (
                    <div key={goal.id} className="flex justify-between w-full gap-2">
                        <GoalDisplayMinimal className="w-full" goal={goal} />
                            {goal.is_focused ? (
                                <Button variant={"ghost"}  onClick={() => updateGoalFocusStatus(goal.id, false)}>
                                    <LuEye />
                                </Button>
                            ) : (
                                <Button variant={"ghost"} onClick={() => updateGoalFocusStatus(goal.id, true)}>
                                    <LuEyeClosed className="text-muted-foreground"/>
                                </Button>
                            )}
                    </div>
                ))
            ) : (
                <Spinner/>
            )}
        </div>

    )
}