import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createReflection } from "../api-helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useGoalStore } from "../stores/useGoalsStore";


const formSchema = z.object({
  title: z.string(),
  description: z.string().min(1, { message: "description is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ReflectionButton() {
  const selectedGoal = useGoalStore((state) => state.selectedGoal);
  const [open, setOpen] = useState(false);
  const onSubmit = async (values: FormValues) => {
    try {
      if (!selectedGoal) {
        console.error("No selected goal to create reflection for");
        return;
      }
      const newReflection = await createReflection(selectedGoal.id, values.title, values.description);
      console.log("Reflection created:", newReflection);
      setOpen(false);
      reset();
    } catch (error) {
      console.error("Failed to create goal:", error);
      // TODO: show error state
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit", // errors only after submit
  });
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            write thoughts
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogTitle>something in mind?</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4`}>
            {/* reflection title */}
            <div>
              <label className="block text-sm font-medium mb-1">title</label>
              <Input placeholder="untitled thought" {...register("title")} />
              {isSubmitted && errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* reflection description */}
            <div>
              <label className="block text-sm font-medium mb-1">description</label>
              <Textarea
                className="resize-none"
                placeholder="ugh this feels impossible"
                {...register("description")}
              />
              {isSubmitted && errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>
            {/* submit button */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "creating..." : "create goal"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    )
}