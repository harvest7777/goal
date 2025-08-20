import { getUserUUID } from "../api-helpers";
import supabase from "@/lib/supabase/supabase"

export const createGoal = async(name: string, motivator: string|null, weekly_commitment: number ): Promise<Goal> => {
    const owner = await getUserUUID();
    const { data, error } = await supabase
        .from("goals")
        .insert({ name, motivator, weekly_commitment, owner })
        .select("*")
        .single();
    
    if (error) {
        throw new Error(`Error creating goal: ${error.message}`);
    }

    return data as Goal;
}

export const getGoals = async(): Promise<Goal[]> => {
    const owner = await getUserUUID();
    const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("owner", owner);

    if (error) {
        throw new Error(`Error fetching goals: ${error.message}`);
    }

    return data as Goal[];
}