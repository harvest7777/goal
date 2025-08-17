"use client";

import { useDailyChartData } from "../_hooks/useDailyChartData";
import { RenderChart } from "./render-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CenteredSpinner from "@/components/ui/centered-spinner";
import { formatMinutesToHoursAndMinutes } from "../api-helpers";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase/supabase";

interface DayProgressProps {
    date: Date | undefined;
    display: string;
    className?: string;
}
export default function DayProgressPage({ date, display, className }: DayProgressProps) {
    const [goalsToRender, setGoalsToRender] = useState<Goal[] | null>(null);
    useEffect(()=>{
        if (!date) {
            return;
        }
        const fetchWorkedOnGoals = async () => {
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);
            
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);
            const { data, error } = await supabase.rpc("get_goals_worked_on_from_time_range", {p_start_time: startDate, p_end_time: endDate});
            if (error) {
                console.error("Error fetching worked on goals:", error);
                return;
            }
            setGoalsToRender(data);
        };
        fetchWorkedOnGoals();
    },[date])
    const { goalData, chartConfig, loading, xFormatter, yFormatter } = useDailyChartData(goalsToRender, date);

    if (!date || display !== "day" ||loading || !goalData || !goalsToRender) {
        return <CenteredSpinner />;
    }

    return (
        <div className={`${className} flex flex-col items-center justify-center gap-5`}>
            <h2>{formatMinutesToHoursAndMinutes(goalData.totalMinsWorkingThisDay)}</h2>

            <div className={`flex flex-wrap gap-5 items-center align-middle justify-center`}>
            {goalsToRender!
            .filter((goal) => goal.weekly_commitment !== null && goal.is_focused)
            .map((goal) => (
            <Card key={goal.id} className={`w-80 ${!goal.is_focused && 'opacity-30'}`}>
            <CardHeader>
                <CardTitle className="flex justify-between">
                <span className="w-3/5 line-clamp-1">{goal.name}</span>
                <span className="text-muted-foreground font-normal">{formatMinutesToHoursAndMinutes(goalData.goalToTotalMins[goal.id])}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <RenderChart
                    chartData={goalData.goalToChartData[goal.id]}
                    chartConfig={chartConfig}
                    target={goalData.goalToTargetMins[goal.id]}
                    total={goalData.goalToTotalMins[goal.id]}
                    formatX={xFormatter}
                    formatY={yFormatter}
                    tickX={4}
                    tickY={4}
                />
            </CardContent>
            </Card>
            ))}
            </div>
        </div>
    )
}
