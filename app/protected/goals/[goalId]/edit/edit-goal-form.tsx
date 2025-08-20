"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGoalStore } from "@/app/protected/stores/useGoalsStore";
import { GoalInput, goalSchema } from "@/app/schemas/goal";
import supabase from "@/lib/supabase/supabase";

type Props = {
  className?: string;
  goal: Goal;
};

export default function EditGoalForm({ className, goal }: Props) {
    const updateGoal = useGoalStore((state) => state.updateGoal);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isSubmitted },
    } = useForm<GoalInput>({
            resolver: zodResolver(goalSchema),
            mode: "onSubmit", // errors only after submit
            defaultValues: {
                name: goal.name,
                motivator: goal.motivator || "",
                daily_commitment: goal.daily_commitment || 0,
                weekly_commitment: goal.weekly_commitment || 0,
            },
        });

    const onSubmit = async (values: GoalInput) => {
        const {data, error} = await supabase
        .from("goals")
        .update(values)
        .eq("id", goal.id)
        .select("*")
        .single();
        if (error) {
            console.error("Error updating goal:", error);
            return;
        }
        updateGoal(data);
        reset({
        name: data.name,
        motivator: data.motivator ?? "",
        daily_commitment: data.daily_commitment ?? 0,
        weekly_commitment: data.weekly_commitment ?? 0,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
        {/* goal name */}
        <div>
            <label className="block text-sm font-medium mb-1">goal name</label>
            <Input placeholder="get an internship" {...register("name")} />
            {isSubmitted && errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
        </div>

        {/* motivator */}
        <div>
            <label className="block text-sm font-medium mb-1">motivator</label>
            <p className="text-sm text-gray-500 mb-2">why do you want this?</p>
            <Textarea
            className="resize-none"
            placeholder="those who write their motivators are more likely to accomplish their goals"
            {...register("motivator")}
            />
            {isSubmitted && errors.motivator && (
            <p className="text-red-500 text-sm">{errors.motivator.message}</p>
            )}
        </div>

        {/* weekly hour commitment */}
        <div>
            <label className="block text-sm font-medium mb-1">weekly hour commitment</label>
            <Input
            type="number"
            placeholder="0"
            {...register("weekly_commitment", { valueAsNumber: true })}
            />
            {isSubmitted && errors.weekly_commitment && (
            <p className="text-red-500 text-sm">{errors.weekly_commitment.message}</p>
            )}
        </div>

        {/* daily time commitment */}
        <div>
            <label className="block text-sm font-medium mb-1">dailycommitment</label>
            <Input
            type="number"
            placeholder="0"
            {...register("daily_commitment", { valueAsNumber: true })}
            />
            {isSubmitted && errors.daily_commitment && (
            <p className="text-red-500 text-sm">{errors.daily_commitment.message}</p>
            )}
        </div>
        {/* submit button */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "saving..." : "save changes"}
        </Button>
        </form>
    );
}
