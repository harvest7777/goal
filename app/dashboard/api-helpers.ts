import supabase from "@/lib/supabase/supabase";

export const getUserUUID = async (): Promise<string> => {
    const { data, error } = await supabase.auth.getUser();
    
    if (error || !data.user) {
        throw new Error(`Error fetching user UUID: ${error?.message || "User not found"}`);
    }
    
    return data.user.id;
}

export const createSession = async (goalId: number, startString: string, endString: string): Promise<Session> => {
    const {data, error} = await supabase.from("sessions").insert(
      {
        start_time: startString,
        end_time: endString,
        goal_id: goalId,
      }
    )
    .select("*")
    .single();

    if (error) {
        throw new Error(`Error creating session: ${error.message}`);
    }

    return data as Session;
}

export const createReflection = async ( goalId: number, title: string, description: string): Promise<Reflection> => {
    const {data, error} = await supabase.from("reflections").insert(
      {
        goal_id: goalId,
        title: title,
        description: description,
      }
    )
    .select("*")
    .single();

    if (error) {
        throw new Error(`Error creating reflection: ${error.message}`);
    }

    return data as Reflection;
}
