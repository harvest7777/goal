import { useEffect, useState, useCallback } from "react";
import { ChartConfig } from "@/components/ui/chart";
import supabase from "@/lib/supabase/supabase";


export function useDailyChartData(date: Date| undefined) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [goalData, setGoalData] = useState<{
        goalsToRender: Goal[] | null;
        goalToChartData: Record<number, { x: number; value: number }[]>;
        goalToTargetMins: Record<number, number>;
        goalToTotalMins: Record<number, number>;
        totalMinsWorkingThisDay: number;
    } | null>(null);

    useEffect(()=>{
        if (!date) {
            return;
        }

        setError(null);

        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        try {
            const fetchData = async () => {

                setLoading(true);

                const { data: goals, error } = await supabase.rpc("get_goals_worked_on_from_time_range", {p_start_time: startDate, p_end_time: endDate});
                if (error) {
                    console.error("Error fetching worked on goals:", error);
                    return;
                }
                const goalToChartData = await getGoalToChartDatas(goals, startDate);
                const goalToTotalMins = await getGoalToTotalTime(goals, startDate, endDate);
                const goalToTargetMins = getGoalToMax(goals);
                const totalMinsWorkingThisDay = await getTotalTime(startDate, endDate);

                setGoalData({ goalsToRender: goals, goalToChartData, goalToTotalMins, goalToTargetMins, totalMinsWorkingThisDay });

                setLoading(false);
            };

            fetchData();
        } catch (err) {
            console.error("Error fetching day chart data:", err);
            setError("Error fetching day chart data.");
            setLoading(false);
        }
    },[date]);


    const memoizedXFormatter = useCallback((x: number) => formatHour(x), []);
    const memoizedYFormatter = useCallback((y: number) => formatMinutes(y), []);


    if (!date) {
        return {
            goalData: null,
            chartConfig: null,
            error: "Invalid date",
            loading: false,
            xFormatter: null,
            yFormatter: null,
        };
    }

    return {
        goalData,
        chartConfig,
        error, 
        loading,
        xFormatter: memoizedXFormatter,
        yFormatter: memoizedYFormatter,
    };
}

const getGoalToChartDatas = async (goals: Goal[], startDate: Date) => {
    const now = new Date();
    const isSameDay = startDate.toDateString() === now.toDateString();

    const shouldCutOff = (index: number): boolean => {
        return isSameDay && index > now.getHours()+1;
    }
    const goalToChartData = await Promise.all(
        goals.map(async (goal) => {
            const { data, error } = await supabase.rpc('get_hourly_time_over_range_of_hours', {
                p_goal_id: goal.id,
                p_hours: 24,
                p_start_time: startDate.toISOString(),
            });

            if (error || !data) {
                throw new Error("Failed to fetch hourly data");
            }
            console.log("Hourly data for goal", data);

            // let runningSum = 0;
            const chartData = data.map((d: {  day_time: number }, index: number) => {
                // runningSum += d.day_time / 60000;
                return {
                    x: index,
                    value: shouldCutOff(index) ? null : d.day_time / 60000, // change to running sum if line chart
                };
            });

            return [goal.id, chartData] as [number, { x: number, value: number }[]];
        })
    );

    return Object.fromEntries(goalToChartData);
}

const getGoalToTotalTime = async(goals: Goal[], startDate: Date, endDate: Date) => {
      const goalTimePairs = await Promise.all(
        goals.map(async (goal) => {
          const { data, error } = await supabase.rpc('get_total_time_spent_from_range', {
            p_goal_id: goal.id,
            p_start_time: startDate.toISOString(),
            p_end_time: endDate.toISOString()
          });

          if (error || data == null) {
            throw new Error("Failed to fetch total time spent");
          }

          return [goal.id, data/60000];
        })
      );

      const goalToTotalMins = Object.fromEntries(goalTimePairs);
      return goalToTotalMins;
}

const getTotalTime = async(startDate: Date, endDate: Date) => {
    const { data, error} = await supabase.rpc('get_total_time_spent_from_range', {
        p_start_time: startDate.toISOString(),
        p_end_time: endDate.toISOString()
    });
    if (error || data == null) {
        throw new Error("Failed to fetch total time spent");
    }
    return data/60000;
}

const getGoalToMax = (goals: Goal[]) => {
    const goalToTargetMins = {} as Record<number, number>;
    goals.forEach(goal => {
        if (goal.daily_commitment === null) {
            goalToTargetMins[goal.id] = 0;
        } else {
            goalToTargetMins[goal.id] = goal.daily_commitment;
        }
    });
    return goalToTargetMins;
}

const formatHour = (hour: number): string => {
  const suffix = hour < 12 ? "AM" : "PM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12} ${suffix}`;
};

const chartConfig = {
value: {
    label: "minutes",
    color: "hsl(var(--chart-2))"
},
} satisfies ChartConfig;

const formatMinutes = (minutes: number): string => {
    return minutes + "m";
}