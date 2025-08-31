import {z} from "zod";  

export const goalSchema = z.object({
  name: z.string().min(1, { message: "goal name is required" }),
  motivator: z.string().nullable(),
});

export type GoalInput = z.infer<typeof goalSchema>;