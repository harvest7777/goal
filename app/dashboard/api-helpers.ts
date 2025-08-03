import supabase from "@/lib/supabase/supabase";

export const getUserUUID = async (): Promise<string> => {
    const { data, error } = await supabase.auth.getUser();
    
    if (error || !data.user) {
        throw new Error(`Error fetching user UUID: ${error?.message || "User not found"}`);
    }
    
    return data.user.id;
}

export const createSession = async (goalId: number, start_time: Date, end_time: Date): Promise<Session> => {
    const { data, error } = await supabase
        .from("sessions")
        .insert({ goal_id: goalId, start_time: start_time.toISOString(), end_time: end_time.toISOString() })
        .select("*")
        .single();
    
    if (error) {
        throw new Error(`Error creating session: ${error.message}`);
    }

    return data as Session;
}
