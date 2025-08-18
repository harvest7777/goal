import { useState, useEffect } from "react";
import supabase from "@/lib/supabase/supabase";

interface useDailyOutputsDataProps {
    date: Date | undefined;
}

export default function useDailyOutputsData({date}: useDailyOutputsDataProps) {
    const [sessionData, setSessionData] = useState<{
        session_id: number;
        session_end: Date;
        output_description: string | null;
        reflection_description: string | null;
    }[] | null>(null);

    useEffect(()=>{
        if (!date) {
            return;
        }

        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const init = async() => {
            const {data: sessionOutputs, error} = await supabase.rpc("get_session_data_from_time_range", {
                p_start_time: startDate.toISOString(),
                p_end_time: endDate.toISOString()
            });

            if (error) {
                console.error("Error fetching session data:", error);
                return;
            }

            setSessionData(sessionOutputs);
            console.log(sessionOutputs)
        }

        init();
    },[date])

    return {sessionData};
}