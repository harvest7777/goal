"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getUserUUID } from "../../api-helpers";
import { useGoalStore } from "../../stores/useGoalsStore";
import supabase from "@/lib/supabase/supabase";

const formSchema = z.object({
  name: z.string().min(1, { message: "goal name is required" }),
  motivator: z.string().nullable(),
  daily_commitment: z.number().min(1, { message: "daily commitment must be at least 1 minute" }),
  weekly_commitment: z.number().min(1, { message: "c'mon... you can commit more than that!" }),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  className?: string;
};

export default function NewGoalForm({ className }: Props) {
  const addGoal = useGoalStore((state) => state.addGoal);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit", // errors only after submit
    defaultValues: {
      name: "",
      motivator: null,
    },
  });

  const onSubmit = async (values: FormValues) => {

      const userUUID = await getUserUUID();
      const { data, error } = await supabase.from("goals")
      .insert({
        owner: userUUID,
        name: values.name,
        motivator: values.motivator,
        weekly_commitment: values.weekly_commitment,
        daily_commitment: values.daily_commitment,
      })
      .select("*")
      .single();
      if (error) {
        console.error("Failed to create goal:", error);
        // TODO: show error state
      }
      addGoal(data);
      reset();
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

      {/* weekly minute commitment */}
      <div>
        <label className="block text-sm font-medium mb-1">weekly minute commitment</label>
        <Input
          type="number"
          placeholder="0"
          {...register("weekly_commitment", { valueAsNumber: true })}
        />
        {isSubmitted && errors.weekly_commitment && (
          <p className="text-red-500 text-sm">{errors.weekly_commitment.message}</p>
        )}
      </div>

      {/* daily minute commitment */}
      <div>
        <label className="block text-sm font-medium mb-1">daily minute commitment</label>
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
        {isSubmitting ? "creating..." : "create goal"}
      </Button>
    </form>
  );
}
