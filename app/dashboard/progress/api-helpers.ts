import supabase from "@/lib/supabase/supabase"
export const getSessions = async (goalId: number, startTime: string, endTime: string): Promise<Session[]> => {
    const { data, error } = await supabase.rpc('get_sessions_from_range', {
        p_goal_id: goalId,
        p_start_time: startTime,
        p_end_time: endTime
    })
    if (error) {
        console.error("Error fetching sessions:", error)
        return []
    }
    return data as Session[]
}