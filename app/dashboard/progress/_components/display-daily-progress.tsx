/**
 * This component renders all the daily charts for the user's goals.
 * This has to be a client component because we have to rely on the browser time zone for fetching data.
 * @param goalsToDisplay - The user's goals to display charts for.
 */

"use client";

import { useEffect, useState } from "react";
import { prettifyMs } from "./graph-helpers";
import { RenderDailyChart } from "./render-daily-chart";
import supabase from "@/lib/supabase/supabase";
import Spinner from "@/components/ui/loading-spinner";

interface DailyChartProps {
    goalsToDisplay: Goal[];
    date: Date;
    className?: string;
}

export default function DisplayDailyProgress({ goalsToDisplay: goals, className, date}: DailyChartProps) {
    const [goalData, setGoalData] = useState<{
    goalToDayArray: Record<number, number[]>;
    goalToMs: Record<number, number>;
    totalTimeMs: number;
    } | null>(null);

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

useEffect(() => {
  const init = async () => {
    try {
      // Fetch hourly data per goal
      const goalSessionPairs = (
        await Promise.all(
          goals.map(async (goal): Promise<[number, number[]] | undefined> => {
            const { data, error } = await supabase.rpc('get_hourly_time_over_range_of_hours', {
              p_goal_id: goal.id,
              p_hours: 24,
              p_start_time: startDate.toISOString(),
            });

            if (error) {
              console.error("Error fetching hourly data:", error);
              return undefined;
            }

            const dayArray: number[] = data.map((d: { day_time: number }) => d.day_time / 60000);
            return [goal.id, dayArray];
          })
        )
      ).filter((pair): pair is [number, number[]] => Array.isArray(pair));

      const goalToDayArray = Object.fromEntries(goalSessionPairs);

      // Fetch total time per goal
      const goalTimePairs = await Promise.all(
        goals.map(async (goal) => {
          const { data, error } = await supabase.rpc('get_total_time_spent_from_range', {
            p_goal_id: goal.id,
            p_start_time: startDate.toISOString(),
            p_end_time: endDate.toISOString()
          });

          if (error) {
            console.error("Error fetching total time spent:", error);
          }

          return [goal.id, data];
        })
      );

      const goalToMs = Object.fromEntries(goalTimePairs);

      // Fetch total time overall
      const { data: totalTimeMs, error: totalError } = await supabase.rpc('get_total_time_spent_from_range', {
        p_start_time: startDate.toISOString(),
        p_end_time: endDate.toISOString()
      });

      if (totalError) {
        console.error("Error fetching total time spent:", totalError);
        return;
      }

      // Final single state update
      setGoalData({
        goalToDayArray,
        goalToMs,
        totalTimeMs
      });

    } catch (err) {
      console.error("Unexpected error in init:", err);
    }
  };

  init();
}, [date]);

    if (goalData === null) {
        return <Spinner className="mt-10"/>
    }

    return (
        <div className={`${className} flex flex-col justify-center align-middle items-center gap-5`}>
            <h2>{`total time invested today: ${prettifyMs(goalData.totalTimeMs)}`}</h2>
            <div className={`flex gap-5 items-center align-middle justify-center flex-wrap`}>
                {goals.map((goal) => (
                    <div key={goal.id}>
                    <RenderDailyChart date={date} msSpent={goalData.goalToMs[goal.id]} dayArray={goalData.goalToDayArray[goal.id]} goal={goal}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
