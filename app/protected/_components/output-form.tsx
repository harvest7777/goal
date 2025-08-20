import supabase from "@/lib/supabase/supabase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  description: z.string().min(1, { message: "description is required" }),
});

type FormValues = z.infer<typeof formSchema>;

interface OutputFormProps {
    sessionId: number;
    className?: string;
    doAfterSubmit?: () => void;
}
export default function OutputForm({ sessionId, className, doAfterSubmit }: OutputFormProps) {
  const onSubmit = async (values: FormValues) => {
      await supabase
        .from("outputs")
        .insert({
          session_id: sessionId,
          description: values.description,
        });
      reset();
      doAfterSubmit?.();
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
        <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
        {/* reflection description */}
        <div>
            <label className="block text-sm font-medium mb-1">what was the output of this session?</label>
            <Textarea
            className="resize-none"
            placeholder="i did...."
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
        </form>
    )
}