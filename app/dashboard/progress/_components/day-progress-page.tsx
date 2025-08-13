"use client";

import { useDailyChartData } from "../_hooks/useDailyChartData";
import { RenderChart } from "./render-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CenteredSpinner from "@/components/ui/centered-spinner";
import { useGoalStore } from "../../stores/useGoalsStore";
import { formatMinutesToHoursAndMinutes } from "../api-helpers";

interface DayProgressProps {
    date: Date | undefined;
    display: string;
    className?: string;
}
export default function DayProgressPage({ date, display, className }: DayProgressProps) {
    const goals = useGoalStore((state) => state.goals);
    const { goalData, chartConfig, loading, xFormatter, yFormatter } = useDailyChartData(goals, date);
    if (!goals || !goalData || !date || display !== "day") {
        return null;
    }   
    if (loading) {
        return <CenteredSpinner />;
    }
    return (
        <div className={`${className} flex flex-col items-center justify-center gap-5`}>
            <h2>{formatMinutesToHoursAndMinutes(goalData.totalMinsWorkingThisDay)}</h2>

            <div className={`flex flex-wrap gap-5 items-center align-middle justify-center`}>
            {goals!
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
