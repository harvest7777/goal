"use client";
import supabase from "@/lib/supabase/supabase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

const formSchema = z.object({
  description: z.string().min(1, { message: "description is required" }),
});

type FormValues = z.infer<typeof formSchema>;

interface ReflectionFormProps {
    sessionId: number;
    className?: string;
    nextStep?: () => void;
}
export default function ReflectionForm({ sessionId, className, nextStep }: ReflectionFormProps) {
  const onSubmit = async (values: FormValues) => {
      await supabase
        .from("reflections")
        .insert({
          session_id: sessionId,
          description: values.description,
        });
      reset();
      nextStep?.();
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
    const [randomReflectionMessage, setRandomReflectionMessage] = useState<string >("");
    useEffect(()=>{
      const randomIndex = Math.floor(Math.random() * reflectionStartersMaster.length);
      setRandomReflectionMessage(reflectionStartersMaster[randomIndex-1]);
    },[])
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
        {/* reflection description */}
        <div>
            <Textarea
            className="resize-none"
            defaultValue={randomReflectionMessage}
            placeholder={randomReflectionMessage}
            {...register("description")}
            />
            {isSubmitted && errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
        </div>
        {/* submit button */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "submitting..." : "submit"}
        </Button>
        <Button type="button" onClick={nextStep} variant={"destructive"} disabled={isSubmitting} className="w-full">
          skip reflection &lt;/3
        </Button>
        </form>
    )
}

const reflectionStartersMaster = [
  // future-focused
  "this will benefit me later because...",
  "i’m building skills that will help me in the future by...",
  "this experience will pay off later because...",
  "i’m laying the groundwork for...",
  "this session taught me something i can apply later when...",
  "i’m setting myself up for success in...",
  "the effort now will make future tasks easier because...",
  "i’m investing in my future by...",
  "this will help me handle similar challenges in the future by...",
  "i’m learning things now that i’ll use later for...",

  // casual / motivational
  "i’m proud of...",
  "i enjoyed...",
  "i surprised myself by...",
  "it clicked for me when...",
  "i feel more capable because...",
  "i’m getting better at...",
  "a small win for me was...",
  "i’m motivated by...",
  "i feel confident when...",
  "i’m excited to try...",

  // constructive criticism / improvement
  "i need to improve on...",
  "i could have handled... better by...",
  "i realized i should focus more on...",
  "i wish i had tried...",
  "i learned to approach... differently",
  "i found a strategy that works better for...",
  "i noticed progress in...",
  "i refined my approach to...",
  "i discovered a better way to...",
  "i practiced applying...",

  // growth / learning
  "i learned that...",
  "i realized that...",
  "i discovered that...",
  "i mastered a part of...",
  "i strengthened my approach to...",
  "i gained new insight into...",
  "i feel more skilled at...",
  "i expanded my knowledge of...",
  "i developed a habit of...",
  "i enhanced my skills in...",

  // confidence / capability
  "i feel prepared for...",
  "i successfully...",
  "i achieved...",
  "i applied what i learned in...",
  "i reached a milestone in...",
  "i clarified my understanding of...",
  "i advanced in...",
  "i gained understanding of...",
  "i built confidence in...",
  "i feel more confident about..."
];
