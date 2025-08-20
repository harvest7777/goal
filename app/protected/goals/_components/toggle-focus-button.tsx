"use client";

import { LuEye, LuEyeClosed } from "react-icons/lu";
import supabase from "@/lib/supabase/supabase";
import { useGoalStore } from "../../stores/useGoalsStore";

interface ToggleFocusButtonProps {
    goal: Goal;
}

export default function ToggleFocusButton({ goal }: ToggleFocusButtonProps) {
    const updatedGoal = useGoalStore((state) => state.updateGoal);
    const toggleFocus = async () => {
        // Implement the focus toggle logic here
        const {data, error} = await supabase
        .from('goals')
        .update({ is_focused: !goal.is_focused })
        .eq('id', goal.id)
        .select("*")
        .single();

        if (error) {
            console.error("Error updating goal:", error);
            return;
        }

        if (data) {
            updatedGoal(data);
        }
    };

    return (
        <button onClick={()=>toggleFocus()} className="text-sm text-muted-foreground flex gap-1 items-center align-middle justify-center">
            {goal.is_focused ? <LuEyeClosed /> : <LuEye />}
            {goal.is_focused ? 'unfocus' : 'focus'}
        </button>
    )
}