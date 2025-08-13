import { useEffect, useState } from "react";
import { ChartConfig } from "@/components/ui/chart";
import supabase from "@/lib/supabase/supabase";
import { getISOWeek, getISOWeekYear, setISOWeek, startOfISOWeek } from 'date-fns';

export function useWeeklyChartData(goals: Goal[]|null|undefined, date: Date| undefined) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [goalData, setGoalData] = useState<{
        goalToChartData: Record<number, { x: number; value: number }[]>;
        goalToTargetMins: Record<number, number>;
        goalToTotalMins: Record<number, number>;
        totalMinsWorkingThisWeek: number;
    } | null>(null);
    
    useEffect(()=>{
        if (!goals || !date) {
            return;
        }
        setError(null);

        const weekDayStart = getMondayOfISOWeek(getISOWeek(date), getISOWeekYear(date));
        const weekDayEnd= new Date(weekDayStart);
        weekDayEnd.setDate(weekDayEnd.getDate());
        weekDayEnd.setHours(23, 59, 59, 999);
        const weekEnd = new Date(weekDayEnd);
        weekEnd.setDate(weekEnd.getDate() + 6);
        try {
            const fetchData = async () => {
                setLoading(true);
                const goalToChartData = await getGoalToChartDatas(goals, weekDayStart, weekDayEnd);
                const goalToTotalMins = await getGoalToTotalTime(goals, weekDayStart, weekEnd);
                const goalToTargetMins = getGoalToMax(goals);
                const totalMinsWorkingThisWeek = await getTotalTime(weekDayStart, weekEnd);

                setGoalData({ goalToChartData, goalToTotalMins, goalToTargetMins, totalMinsWorkingThisWeek });
                setLoading(false);
            };

            fetchData();
        } catch (err) {
            console.error("Error fetching day chart data:", err);
            setError("Error fetching day chart data.");
            setLoading(false);
        }
    },[goals, date])

    if (!goals || !date) {
        return {
            goalData: null,
            chartConfig: null,
            error: "Invalid goals or date",
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
        xFormatter: formatDay,
        yFormatter: formatMinutes,
    };
}

const getGoalToChartDatas = async (goals: Goal[], weekDayStart: Date, weekDayEnd: Date) => {
    const currentDay = new Date();
    const isSameISOWeek = (date1: Date, date2: Date): boolean => {
        return (
            getISOWeek(date1) === getISOWeek(date2) &&
            getISOWeekYear(date1) === getISOWeekYear(date2)
        );
    }
    const goalToChartData = await Promise.all(
        goals.map(async (goal) => {
            const { data, error } = await supabase.rpc('get_daily_time_over_range_of_days', {
                p_goal_id: goal.id,
                p_days: 7,
                p_start_time: weekDayStart.toISOString(),
                p_end_time: weekDayEnd.toISOString()
            })

            if (error || !data) {
                throw new Error("Failed to fetch hourly data");
            }

            let runningSum = 0;
            const chartData = data.map((d: {  day_time: number }, index: number) => {
                runningSum += d.day_time / 60000;
                return {
                    x: index,
                    value: (isSameISOWeek(currentDay, weekDayStart) && index > currentDay.getDay()+1) ? null : runningSum,
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
        if (goal.weekly_commitment === null) {
            throw new Error(`Goal ${goal.id} has no weekly commitment. Perhaps input data is bad?`);
        }
        goalToTargetMins[goal.id] = goal.weekly_commitment;
    });
    return goalToTargetMins;
}

const formatDay = (day: number): string => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
};

const formatMinutes = (value: number): string => {
  return `${value} m`
}

const chartConfig = {
value: {
    label: "minutes",
    color: "hsl(var(--chart-5))"
},
} satisfies ChartConfig;

const getMondayOfISOWeek = (week: number, year: number): Date => {
  const jan4 = new Date(year, 0, 4); // Jan 4 is always in ISO week 1
  const weekDate = setISOWeek(jan4, week);
  return startOfISOWeek(weekDate); // Gets the Monday of that ISO week
}