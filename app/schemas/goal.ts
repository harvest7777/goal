import {z} from "zod";  

export const goalSchema = z.object({
  name: z.string().min(1, { message: "goal name is required" }),
  motivator: z.string().nullable(),
  daily_commitment: z.number().min(1, { message: "daily commitment must be at least 1 minute" }),
  weekly_commitment: z.number().min(1, { message: "c'mon... you can commit more than that!" }),
});

export type GoalInput = z.infer<typeof goalSchema>;