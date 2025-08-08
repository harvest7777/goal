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

export const getWeeklySessions = async (goalId: number, startTime: string, endTime: string): Promise<number[]> => {
    const { data, error } = await supabase.rpc('get_daily_time_over_range_of_days', {
        p_goal_id: goalId,
        p_days: 7,
        p_start_time: startTime,
        p_end_time: endTime
    })
    if (error) {
        console.error("Error fetching sessions:", error)
        return []
    }

    const result: number[] = []

    interface DailyTime {
        day_time: number;
    }

    data.forEach((element: DailyTime) => {
        result.push(element.day_time);
    });
    return result;
}