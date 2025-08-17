import supabase from "@/lib/supabase/supabase";
export const getReflectionsFromRange = async(startTime: string, endTime: string): Promise<ReflectionOld[]> => {
    const { data, error } = await supabase
        .from("reflections")
        .select("*")
        .gte("created_at", startTime)
        .lte("created_at", endTime);
    if (error) {
        console.error("Error fetching reflections:", error);
        return [];
    }
    return data as ReflectionOld[];
}
export const getReflections = async(): Promise<ReflectionOld[]> => {
    const { data, error } = await supabase
        .from("reflections")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) {
        console.error("Error fetching reflections:", error);
        return [];
    }
    return data as ReflectionOld[];
}